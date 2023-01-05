import Server from "../../../../../firebase/firebase_server_exports";
import { constDocumentRefs } from "../../../../../firebase/constants/firestore";
import { IAddEventDatabase, IAddEventFrontend, ModifierTypes, } from "../../../../../redux/interfaces/backend/apis/v2/events";
import { ICategoryMap, InsertionType, } from "../../../../../redux/interfaces/backend/apis/v2/common";
import { citiesArray, statesArray } from "../../../getCities";
import { dayFromDate, isValidDate } from "../../utils/dateUtils";
import { fetchCategories } from "../../utils/fetchers";
import { getSignedUrl } from "../../utils/signedUrl";

const categories = fetchCategories().then((data) => data as ICategoryMap);

export const createEvent = async (
  uid: string,
  formData: IAddEventFrontend,
  create: boolean,
  name: string,
  fromAdmin: boolean,
  location: InsertionType
): Promise<{ done: boolean; message: string }> => {
  if (create) {
    const firestoreRef = `${constDocumentRefs.merchants_meta_loc}/pending/${uid}/events-collection/${formData.fileName}`;
    return await addEvent(uid, formData, 'User', name, true, firestoreRef);
  } else {
    if (fromAdmin) {
      const firestoreRef = `${constDocumentRefs.merchants_meta_loc}/${location}/${uid}/events-collection/${formData.fileName}`;
      return await addEvent(uid, formData, 'Admin', name, false, firestoreRef);
    } else {
      const pendingLocation = `${constDocumentRefs.merchants_meta_loc}/pending/${uid}/events-collection/${formData.fileName}`;
      const verifiedLocation = `${constDocumentRefs.merchants_meta_loc}/verified/${uid}/events-collection/${formData.fileName}`;
      const rejectedLocation = `${constDocumentRefs.merchants_meta_loc}/rejected/${uid}/events-collection/${formData.fileName}`;

      const pendingDoc = await Server.db.doc(pendingLocation).get();
      if (pendingDoc.exists && !pendingDoc.data()?.isDeleted) {
        return await addEvent(
          uid,
          formData,
          'User',
          name,
          false,
          pendingLocation
        );
      }
      const verifiedDoc = await Server.db.doc(verifiedLocation).get();
      if (verifiedDoc.exists && !verifiedDoc.data()?.isDeleted) {
        return await addEvent(
          uid,
          formData,
          'User',
          name,
          false,
          verifiedLocation
        );
      }
      return await addEvent(
        uid,
        formData,
        'User',
        name,
        false,
        rejectedLocation
      );
    }
  }
};

export const deleteEvent = async (eventLocation: string) => {
 await Server.db.doc(eventLocation).delete();
  // await eventDoc.set({ isDeleted: true }, { merge: true });
  return { done: true, msg: 'Deleted Data' };
};

export const getEvents = async (
  uid: string,
  location: InsertionType,
  startAt: number,
  endAt: number
) => {
  const startIndex = startAt ?? 0;
  const endIndex = endAt ?? 30;
  const events = await Server.db
    .collection(
      `${constDocumentRefs.merchants_meta_loc}/${location}/${uid}/events-collection`
    )
    .where('isDeleted', '==', false)
    .orderBy('modifiedAt', 'desc')
    .offset(startIndex)
    .limit(endIndex)
    .get();
  const eventsPromises = events.docs.map(
    (doc) =>
      new Promise((resolve) => {
        const event = sendFrontendRequiredParams(
          doc.data() as IAddEventDatabase
        ) as IAddEventFrontend;
        getSignedUrl(event.imageLocation).then((url) => {
          event.imageUri = url[0];
          resolve(event as IAddEventFrontend);
        });
      })
  );
  return (await Promise.all(eventsPromises)) as IAddEventFrontend[];
};

const addEvent = async (
  uid: string,
  formData: IAddEventFrontend,
  modifier: ModifierTypes,
  name: string,
  create: boolean,
  fileLocation: string
): Promise<{ done: boolean; message: string }> => {
  const { valid, message } = await eventFormValidate(formData);
  if (!valid) {
    return { done: false, message: message ?? 'Unexpected Error' };
  }

  if(typeof !formData.category.toString()){
    formData.category.map(async value => {
      if (!(await categories).category.includes(value)) {
        return { done: false, message: "Invalid Category" };
      }
    })
  }else{
    if (!(await categories).category.includes(formData.category.toString())) {
      return { done: false, message: "Invalid Category" };
    }
  }

  const startDateObj = getDateDetails(formData.startDate);
  const endDateObj = getDateDetails(formData.endDate);

  const timeString = new Date().toISOString();

  const eventPayload: IAddEventDatabase = {
    id: fileLocation,
    name: formData.name,
    price: formData.price,
    currency: formData.currency,
    audienceCapacity: formData.audienceCapacity,
    imageLocation: formData.imageLocation,
    fileType: formData.fileType,
    fileName: formData.fileName,
    state: formData.state,
    city: formData.city,
    venue: formData.venue,
    startDate: formData.startDate,
    endDate: formData.endDate,
    category: formData.category,
    about: formData.about,
    aboutHost: formData.aboutHost,
    hostType: formData.hostType,
    hostDescription: formData.hostDescription,
    termsAndConditions: formData.termsAndConditions,
    totalBookings: 0,
    isDeleted: false,
    createdAt: create ? timeString : formData.createdAt,
    hostPoint: formData.hostPoint,
    modifiedAt: timeString,
    lastModifiedBy: modifier,
    serviceSubscription: { requested: [], approved: [], rejected: [] },
    uid: uid,
    creator_name: name,
    lng: 0,
    lat: 0,
    startDay: dayFromDate(formData.startDate),
    endDay: dayFromDate(formData.endDate),
    startMinute: startDateObj.minutes,
    startHour: startDateObj.hours,
    endMinute: endDateObj.minutes,
    endHour: endDateObj.hours,
    startTimeStamp: startDateObj.timeStamp,
    endTimeStamp: endDateObj.timeStamp,
    profession: formData.profession
  };

  await Server.db.doc(fileLocation).set(eventPayload, { merge: true });
  return { done: true, message: 'Success' };
};

const getDateDetails = (date: string) => {
  const dateObject = new Date(date);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const timeStamp = dateObject.getTime();
  return { hours, minutes, timeStamp };
};

export const sendFrontendRequiredParams = (
  data: IAddEventDatabase
): IAddEventFrontend => ({
  id: data.id,
  name: data.name,
  price: data.price,
  currency: data.currency,
  audienceCapacity: data.audienceCapacity,
  imageLocation: data.imageLocation,
  createdAt: data.createdAt,
  fileType: data.fileType,
  fileName: data.fileName,
  state: data.state,
  city: data.city,
  venue: data.venue,
  startDate: data.startDate,
  endDate: data.endDate,
  category: data.category,
  about: data.about,
  aboutHost: data.aboutHost,
  hostType: data.hostType,
  hostDescription: data.hostDescription,
  termsAndConditions: data.termsAndConditions,
  lng: data.lng,
  lat: data.lat,
  hostPoint: data.hostPoint,
  profession:data.profession
});

export const eventFormValidate = async (
  formData: IAddEventFrontend
): Promise<{ valid: boolean; message?: string }> => {
  /*
    # Validation TODOS:
    X Validate if Event Name is Empty
    X Validate State and City Exists
    X Validate UID matches
    X Validate Dates and extract Day from them
    X Validate that Start Date is less than End Date
    X Validate Input Category belongs to list of categories
    X Assign fromTime and toTime minutes and hours
    X Validate fromTime < toTime using getTime
    X overwrite long and lat
    */
  if (formData.name.length <= 0)
    return { valid: false, message: 'Event Name is Empty' };
  if (formData.price < 0)
    return { valid: false, message: 'Price cannot be negative' };
  const stateExists =
    statesArray.includes(formData.state) || formData.state === 'Other';
  if (!stateExists) return { valid: false, message: 'Invalid State' };
  const cityExists = citiesArray.includes(formData.city);
  if (!cityExists) return { valid: false, message: 'Invalid City' };

  const startDate = `${formData.startDate}`;
  const isStartDateValid = isValidDate(startDate);
  if (!isStartDateValid) return { valid: false, message: 'Invalid Start Date' };

  const endDate = `${formData.endDate}`;
  const isEndDateValid = isValidDate(endDate);
  if (!isEndDateValid) return { valid: false, message: 'Invalid End Date' };

  const startDateObj = getDateDetails(startDate);
  const endDateObj = getDateDetails(endDate);
  const startDateTimeStamp = startDateObj.timeStamp;
  const endDateTimeStamp = endDateObj.timeStamp;

  if (startDateTimeStamp > endDateTimeStamp) {
    return { valid: false, message: 'End Date cannot be before Start Date' };
  }

  if (formData.audienceCapacity <= 0) {
    return {
      valid: false,
      message: 'Audience Capacity mus be greated than 0.',
    };
  }

  const startDay = dayFromDate(startDate);
  const endDay = dayFromDate(endDate);

  if (startDay === 'Invalid Day')
    return { valid: false, message: 'Invalid Start Day' };

  if (endDay === 'Invalid Day')
    return { valid: false, message: 'Invalid Start Day' };

  if(typeof !formData.category.toString()){
    formData.category.map(async value => {
      if (!(await categories).category.includes(value)) {
        return { valid: false, message: "Invalid Category 2" };
      }
    })
  }else{
    if (!(await categories).category.includes(formData.category.toString())) {
      return { valid: false, message: "Invalid Category 2" };
    }
  }

  return { valid: true };
};
