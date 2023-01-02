import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";

import {
  Box,
  Button,
  Checkbox,
  createTheme,
  Divider,
  FormControlLabel,
  Link,
  ThemeProvider,
  Typography,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MuiPhoneNumber from "material-ui-phone-number";
import Autocomplete from "@mui/material/Autocomplete";
import classes from "../common.module.scss";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../../../../redux/app/hooks";
import { comparitors } from "../constants/comparitors";
import { ExpectedUpdaeUserPayload } from "../../../../../redux/interfaces/backend/apis/UpdateUser";
import moment from "moment";
import { updateLoading } from "../../../../../redux/slices/signup";
import { updateContactInfo } from "../../../../../lib/frontend/validateNativeForm";
import { GeoAPIResponseInterface } from "../../../../../redux/interfaces";
import { updateNotification } from "../../../../../redux/slices/notifications";
import { getUserDetails } from "../../../../../redux/slices/user";
import { useRouter } from "next/router";
import { Worker } from "@react-pdf-viewer/core";
import _ from "lodash";
import { useEffect, useState } from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const includesWithSubscription = [
  { _id: 1, title: "Create profile with multiple offerings" },
  { _id: 2, title: "Get inquiries for your offerings" },
  { _id: 3, title: "Accept or Reject Orders" },
  { _id: 4, title: "Drive traffic to your profile" },
  { _id: 5, title: "Trustworthy and legit clients" },
  { _id: 6, title: "Track your customers and visitors" },
  { _id: 7, title: "Get honest ratings and reviews of your work" },
  { _id: 8, title: "Unlimited customer support" },
  { _id: 8, title: "Break Free guarantee for payments" },
  { _id: 8, title: "Edit your portfolio (optional)" },
  { _id: 8, title: "Embedded calendar tool for organising your work life" },
];

export default function PaymentSection() {
  const [ndaTrue, setNdaTrue] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [isEditContact, setIsEditContact] = useState(false);
  const [state, setState] = useState("");
  const [errors, setErrors] = useState("");
  const [formFields, setFormFields] = useState({
    displayName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    fp: "",
  });
  const [existedContact, setExistContact] = useState({
    displayName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    fp: "",
  });
  

  const router = useRouter();
  const plan = router.asPath.split("/")[4];
  const dispatch = useAppDispatch();
  const pageSection = router.query.merchantSlug?.[2] ?? comparitors.EVENTS;
  const {
    subscription: { isTermsAndCondition, isSubscription, isMerchants },
    user: { user, firebaseToken },
    profile,
  } = useAppSelector((state) => state);

  let Component = <div>No Such Component Found</div>;
  switch (pageSection) {
    default: {
    }
  }

  const updateInfo = async (payload: any) => {
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      };
      const response = await fetch("/api/payments/edit-contact-info", config);
      const json = await response.json();
      if (response.ok) {
        dispatch(
          updateNotification({
            status: "success",
            message: "Update Operation Success!",
            title: "success",
            show: true,
          })
        );
        return json;
      } else {
        return false;
      }
    } catch (error) {
      dispatch(
        updateNotification({
          status: "error",
          message: "Update Operation Failed!",
          title: "Error",
          show: true,
        })
      );
      return false;
    }
  };

  const getContactInfo = async () => {
    try {
      const formData = {
        firebaseToken: firebaseToken,
        payload: {
          uid: user?.uid,
        },
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch("/api/payments/get-contact-info", config);
      const json = await response.json();
      console.log("json", json);
      if (response.ok && json.data.length > 0) {
        const formData: any = _.omit(json.data[json.data.length - 1], [
          "uid",
          "metadata",
          "createdAt",
        ]);
        setFormFields(formData);
        setExistContact(formData);
      }
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (firebaseToken) {
      getContactInfo();
    }
  }, [firebaseToken]);

  useEffect(() => {
    if (isEditContact) {
      setFormFields(existedContact);
    }
  }, [isEditContact]);

  const handleCancel = () => {
    setIsEditContact(false);
    setFormFields({
      displayName: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      fp: "",
    });
  };

  const handleEditContact = async () => {
    if (isEditContact) {
      const error = updateContactInfo(formFields);
      setErrors(error);
      if (_.isEmpty(error)) {
        const formData = {
          firebaseToken: firebaseToken,
          payload: {
            ...formFields,
            uid: user?.uid,
            fp: !_.isEmpty(existedContact)
              ? existedContact.fp
              : `contact_info_${Date.now()}`,
            metadata: {
              name: user?.displayName,
              uid: user?.uid,
            },
          },
        };
        const res = await updateInfo(formData);
        if (res) {
          getContactInfo();
          setIsEditContact(false);
        }
      }
    } else {
      setIsEditContact(true);
    }
  };

  const path = router?.query?.merchantSlug[1];
  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const data = await fetch("/api/merchant/razorpay", { method: "POST" }).then(
      (t) => t.json()
    );
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "SS BREAK FREE LLP",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thanks for choosing breakfree subscription",
      // image: "https://breakfree.vercel.app/logo-dark.png",

      handler: function (response: any) {
        // Validate payment at server - using webhooks is a better idea.
        // alert(date.addMonths(3));
        const renewDays = moment(user?.subscriptionEndDate).diff(
          moment(),
          "days"
        );
        const body: ExpectedUpdaeUserPayload = {
          firebaseToken: firebaseToken,
          updatedUserData: {
            ...user,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            subscription: true,
            plan: "pro",
            subscription_change: true,
            subscriptionStartDate: new Date().toISOString(),
            subscriptionEndDate: moment()
              .add({ months: 4, days: renewDays > 0 ? renewDays : 0 })
              .toISOString(),
          },
        };

        fetch("/api/update-user-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data.error) {
              dispatch(updateLoading({ loading: false }));
              dispatch(
                updateNotification({
                  status: "error",
                  message: "Update Operation Failed!",
                  title: "Error",
                  show: true,
                })
              );
            } else {
              router.push(`/merchants/${user.slug}/subscription`);
              dispatch(updateLoading({ loading: false }));
              // closeModal && closeModal();
              dispatch(
                updateNotification({
                  message: "Subscription Started Successfully",
                  show: true,
                  status: "success",
                  title: "Success",
                })
              );
              dispatch(getUserDetails({ firebaseToken: firebaseToken }));
            }
          })
          .catch((error) => {
            dispatch(updateLoading({ loading: false }));
            dispatch(
              updateNotification({
                status: "error",
                message: "Update Operation Failed!",
                title: "Error",
              })
            );
          });
      },
      prefill: {
        name: user.displayName,
        email: user.email,
        contact: user.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const formChangeHandler = (
    value: string | number | string[],
    key: string
  ) => {
    setErrors({ ...errors, [key]: undefined });
    setFormFields({
      ...formFields,
      [key]: value,
    });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment1 = async () => {
    const orderid = new Date().getTime();

    const body: ExpectedUpdaeUserPayload = {
      firebaseToken: firebaseToken,
      updatedUserData: {
        ...user,
        subscription: false,
        plan: "basic",
        subscriptionStartDate: new Date().toISOString(),
        subscriptionEndDate: "",
        subscription_change: true,
        // subscriptionEndDate: moment().add(1, 'month').toISOString(),
      },
    };

    fetch("/api/update-user-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          dispatch(updateLoading({ loading: false }));
          dispatch(
            updateNotification({
              status: "error",
              message: "Update Operation Failed!",
              title: "Error",
              show: true,
            })
          );
        } else {
          router.push(`/merchants/${user.slug}/subscription`);
          dispatch(updateLoading({ loading: false }));
          // closeModal && closeModal();
          dispatch(
            updateNotification({
              message: "Subscription Started Successfully",
              show: true,
              status: "success",
              title: "Success",
            })
          );
          dispatch(getUserDetails({ firebaseToken: firebaseToken }));
        }
      })
      .catch((error) => {
        dispatch(updateLoading({ loading: false }));
        dispatch(
          updateNotification({
            status: "error",
            message: "Update Operation Failed!",
            title: "Error",
          })
        );
      });
  };

  let probutton;
  if (
    user.plan &&
    user.plan == "pro" &&
    user.subscription &&
    user.subscriptionEndDate &&
    moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
  ) {
    const renewcondition =
      moment(user?.subscriptionEndDate).diff(moment(), "days") <= 5;
    probutton = (
      <Box style={{ width: "200px", margin: "0 auto" }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#FFFF00",
            color: "#000000",
            ":hover": {
              backgroundColor: "#000000",
              color: "#FFFF00",
            },
            py: 1.2,
            borderRadius: "50px",
            fontWeight: 700,
          }}
          onClick={renewcondition ? makePayment : makePayment1}
          disabled={!ndaTrue}
        >
          {renewcondition ? "Renew Pro" : "Start With Basic"}
        </Button>
      </Box>
    );
  } else if (
    user.plan &&
    user.plan == "basic" &&
    user.subscription &&
    user.subscriptionEndDate &&
    moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
  ) {
    probutton = (
      <Box style={{ width: "200px", margin: "0 auto" }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#FFFF00",
            color: "#000000",
            ":hover": {
              backgroundColor: "#000000",
              color: "#FFFF00",
            },
            py: 1.2,
            borderRadius: "50px",
            fontWeight: 700,
          }}
          onClick={makePayment}
          disabled={!ndaTrue}
        >
          {user?.subscribed ? "Renew Pro" : "Start with Pro"}
        </Button>
      </Box>
    );
  } else {
    probutton =
      plan === "basic" ? (
        <Box style={{ width: "200px", margin: "0 auto" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FFFF00",
              color: "#000000",
              ":hover": {
                backgroundColor: "#000000",
                color: "#FFFF00",
              },
              py: 1.2,
              borderRadius: "50px",
              fontWeight: 700,
            }}
            onClick={makePayment1}
          >
            Start With Basic
          </Button>
        </Box>
      ) : (
        <Box style={{ width: "200px", margin: "0 auto" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FFFF00",
              color: "#000000",
              ":hover": {
                backgroundColor: "#000000",
                color: "#FFFF00",
              },
              py: 1.2,
              borderRadius: "50px",
              fontWeight: 700,
            }}
            onClick={makePayment}
          >
            {user?.subscribed ? "Renew Pro" : "Start with Pro"}
          </Button>
        </Box>
      );
  }

  let total;
  if (
    user.plan &&
    user.plan == "pro" &&
    user.subscription &&
    user.subscriptionEndDate &&
    moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
  ) {
    total = (
      <Typography
        sx={{
          mb: 0,
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
        variant="body2"
        gutterBottom
        component="h1"
      >
        <CurrencyRupeeIcon
          sx={{ mr: 1, fontSize: "110%", fontWeight: "bold" }}
        />{" "}
        0
      </Typography>
    );
  } else if (
    user.plan &&
    user.plan == "basic" &&
    user.subscription &&
    user.subscriptionEndDate &&
    moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
  ) {
    total = (
      <Typography
        sx={{
          mb: 0,
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
        }}
        variant="body2"
        gutterBottom
        component="h1"
      >
        <CurrencyRupeeIcon
          sx={{ mr: 1, fontSize: "110%", fontWeight: "bold" }}
        />{" "}
        1,770
      </Typography>
    );
  }

  let planSubscription;
  if (
    user.plan &&
    user.plan == "pro" &&
    user.subscription &&
    user.subscriptionEndDate &&
    moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
  ) {
    planSubscription = 0;
  } else if (
    user.plan &&
    user.plan == "basic" &&
    user.subscription &&
    user.subscriptionEndDate &&
    moment(user?.subscriptionEndDate) >= moment(new Date().toISOString())
  ) {
    planSubscription = 1770;
  }
  useEffect(() => {
    const fetchGeoData = () => {
      fetch("/api/geo").then((res) =>
        res.json().then((data) => {
          const { cities } = data as GeoAPIResponseInterface;
          setCities(cities);
        })
      );
    };
    fetchGeoData();
  }, []);

  const triggerCityChange = (cityData: any) => {
    const cityList = cityData;
    fetch("/api/get-state", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: cityList }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            const { state } = data;
            setState(state);
            setFormFields({ ...formFields, state, city: cityList });
          })
          .catch((error) => console.log("Unexpected Error occured"))
      )
      .catch((error) => console.log("Unexpected Error occured"));
  };


  return (
    <>
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.7.570/build/pdf.worker.js">
    </Worker> */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ minWidth: 275 }}>
            <Card
              variant="outlined"
              sx={{
                py: 2,
                background: "#F8F8F8",
                boxShadow: "0px 10px 20px rgba(124, 124, 124, 0.2)",
                border: "0",
              }}
            >
              <Box sx={{ display: "flex", px: 2 }}>
                {/* <CheckCircleIcon sx={{ color: '#4DAA0F', fontSize: '160%' }} /> */}
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
                    <Box sx={{ ml: 1 }}>
                      <Typography
                        sx={{ mb: 0 }}
                        variant="subtitle1"
                        component="h1"
                      >
                        <b
                          style={{
                            fontStyle: "normal",
                            fontWeight: 700,
                            fontSize: "21px",
                            lineHeight: "29px",
                          }}
                        >
                          Your order
                        </b>
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        py: 2,
                        width: "100%",
                      }}
                    >
                      <Box sx={{ ml: 1, width: "100%", display: "flex" }}>
                        <Box sx={{ width: "50%" }}>
                          <Typography
                            sx={{ mb: 0 }}
                            variant="subtitle1"
                            component="h1"
                          >
                            <b style={{ textTransform: "capitalize" }}>
                              Break Free {plan}
                            </b>
                          </Typography>
                          <Typography
                            sx={{ mb: 0 }}
                            variant="body2"
                            gutterBottom
                            component="h1"
                          >
                            <b>
                              {" "}
                              Collaborate, Earn, Grow and be limitless with
                              Break Free Pro.
                            </b>
                          </Typography>
                          <Typography sx={{ fontSize: "12px" }}>
                            Plan Subscription :{" "}
                            <CurrencyRupeeIcon
                              sx={{ fontSize: 11, fontWeight: "medium" }}
                            />{" "}
                            {plan === "basic"
                              ? "0 for month"
                              : "1500 for 3 months"}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "50%", textAlign: "end", mt: 5 }}>
                          <h1 style={{ margin: 0 }}>
                            {" "}
                            <CurrencyRupeeIcon />
                            &nbsp;{plan === "basic" ? "0" : "1500"}
                          </h1>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>

            <Card
              variant="outlined"
              sx={{
                py: 2,
                mt: 5,
                background: "#F8F8F8",
                boxShadow: "0px 10px 20px rgba(124, 124, 124, 0.2)",
                border: "0",
              }}
            >
              <Box sx={{ display: "flex", px: 2 }}>
                {/* <CheckCircleIcon sx={{ color: '#4DAA0F', fontSize: '160%', mt: 2 }} /> */}
                <Box sx={{ width: "100%" }}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pt: 2, pb: 2 }}
                  >
                    <Box sx={{ ml: 1 }}>
                      <Typography
                        sx={{ mb: 0 }}
                        variant="body2"
                        gutterBottom
                        component="h1"
                      >
                        <b
                          className="cont_info"
                          style={{
                            fontWeight: 700,
                            fontSize: "21px",
                            lineHeight: "29px",
                          }}
                        >
                          Contact Information
                        </b>
                      </Typography>
                    </Box>
                    <Box sx={{ ml: "auto" }} className="btn_wrp">
                      {isEditContact ? (
                        <Button
                          style={{ background: "#D9D9D9", color: "#000000" }}
                          variant={"contained"}
                          onClick={handleCancel}
                          startIcon={<EditIcon />}
                        >
                          {isEditContact ? "Cancel" : null}
                        </Button>
                      ) : null}
                      &nbsp;&nbsp;
                      <Button
                        style={{ background: "#D9D9D9", color: "#000000" }}
                        variant={"contained"}
                        onClick={handleEditContact}
                        startIcon={<EditIcon />}
                      >
                        {isEditContact ? "Save" : "Edit"}
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={{ ml: 1, py: 1 }}>
                    {isEditContact ? (
                      <>
                        <div className={classes.editContactInfo}>
                          <PersonIcon />
                          <TextField
                            required
                            label="Full Name"
                            size="small"
                            type="text"
                            value={formFields?.displayName}
                            onChange={(e) =>
                              formChangeHandler(e.target.value, "displayName")
                            }
                            error={errors.displayName !== undefined}
                            helperText={errors.displayName}
                          />
                        </div>

                        <div className={classes.editContactInfo}>
                          <MailIcon />
                          <TextField
                            required
                            label="Email Address"
                            size="small"
                            type="email"
                            value={formFields?.email}
                            error={errors.email !== undefined}
                            helperText={errors.email}
                            onChange={(e) =>
                              formChangeHandler(e.target.value, "email")
                            }
                          />
                        </div>

                        <div className={classes.editContactInfo}>
                          <LocalPhoneIcon />
                          <MuiPhoneNumber
                            variant="outlined"
                            name="phone"
                            data-cy="user-phone"
                            required
                            label="Phone Number"
                            size="small"
                            defaultCountry={"in"}
                            value={formFields.phone}
                            error={errors.phone !== undefined}
                            helperText={errors.phone}
                            onChange={(e) =>
                              formChangeHandler(e.toString(), "phone")
                            }
                            sx={{
                              width: "328px",
                              svg: {
                                height: "20px",
                              },
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography
                          sx={{ mb: 0 }}
                          variant="body2"
                          gutterBottom
                          component="h1"
                        >
                          {existedContact?.displayName || user.displayName}
                        </Typography>

                        <Typography
                          sx={{ mb: 0 }}
                          variant="body2"
                          gutterBottom
                          component="h1"
                        >
                          {existedContact?.email || user.email}
                        </Typography>
                        <Typography
                          sx={{ mb: 0 }}
                          variant="body2"
                          gutterBottom
                          component="h1"
                        >
                          {existedContact?.phone || user.phone}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Box sx={{ ml: 1, py: 1 }}>
                    {isEditContact ? (
                      <>
                        <div className={classes.editContactInfo}>
                          <LocationCityIcon />
                          <Autocomplete
                            disablePortal
                            options={cities}
                            value={formFields.city}
                            className={classes.editContactInfoCity}
                            onChange={(_, e) => {
                              if (e) {
                                formChangeHandler(e.toString(), "city");
                                triggerCityChange(e.toString());
                              }
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="City"
                                required
                                // onBlur={triggerCityChange}
                                size="small"
                                value={formFields.city}
                                error={errors.city !== undefined}
                                helperText={errors.city}
                                onChange={(e) => {
                                  formChangeHandler(e.target.value, "city");
                                  triggerCityChange(e.target.value);
                                }}
                              />
                            )}
                          />
                        </div>

                        <div className={classes.editContactInfo}>
                          <LocationOnIcon />
                          <TextField
                            disabled
                            label="State"
                            size="small"
                            value={formFields.state}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <Typography
                          sx={{ mb: 0 }}
                          variant="body2"
                          gutterBottom
                          component="h1"
                        >
                          {existedContact?.city ||
                            (user.city !== undefined &&
                              user.city[0].toUpperCase() + user.city.slice(1))}
                        </Typography>
                        <Typography
                          sx={{ mb: 0 }}
                          variant="body2"
                          gutterBottom
                          component="h1"
                        >
                          {existedContact?.state || user.state}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Card>

            <Card
              variant="outlined"
              sx={{
                p: 4,
                mt: 5,
                background: "#F8F8F8",
                boxShadow: "0px 10px 20px rgba(124, 124, 124, 0.2)",
                border: "0",
              }}
            >
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                sx={{
                  fontWeight: 700,
                  fontSize: "21px",
                  lineHeight: "29px",
                  mb: 3,
                }}
              >
                Include with your purchase.
              </Typography>
              {includesWithSubscription.map(({ _id, title }) => (
                <Box key={_id} sx={{ display: "flex" }}>
                  {/* <DoneRoundedIcon sx={{ color: '#4daa0f' }} /> */}
                  <img src="/checkedimg.svg" height={20} width={20} />
                  <Typography
                    sx={{ ml: 2 }}
                    variant="subtitle1"
                    gutterBottom
                    component="div"
                  >
                    {title}
                  </Typography>
                </Box>
              ))}
              {/* <Divider sx={{ py: 0.5 }} />
              <Box
                sx={{
                  pt: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ mb: 0, fontWeight: 'medium' }} variant='subtitle1' gutterBottom component='div'>
                  Total
                </Typography>
                {total}
              </Box> */}
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Box sx={{ mb: 2 }}> */}
          {/* <Card variant='outlined' sx={{ p: 2 }}> */}
          {/* <Typography variant='subtitle1' gutterBottom component='div' sx={{ fontWeight: 'medium' }}>
                Include with your purchase.
              </Typography>
              {includesWithSubscription.map(({ _id, title }) => (
                <Box key={_id} sx={{ display: 'flex' }}>
                  <DoneRoundedIcon sx={{ color: '#4daa0f' }} />
                  <Typography variant='subtitle1' gutterBottom component='div'>
                    {title}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ py: 0.5 }} />
              <Box
                sx={{
                  pt: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ mb: 0, fontWeight: 'medium' }} variant='subtitle1' gutterBottom component='div'>
                  Total
                </Typography>
                {total}
              </Box> */}
          {/* </Card> */}
          {/* </Box> */}
          <Box sx={{ minWidth: 275, p: 2 }}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#FFFEE7",
                my: 4,
                boxShadow: "0px 10px 20px rgba(124, 124, 124, 0.2)",
                px: 3,
                border: "0",
              }}
            >
              <Box sx={{ display: "flex", pb: 1, mt: 3 }}>
                <Typography sx={{}} variant="subtitle1" component="h1">
                  <b>By checking out:</b>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", px: 2, py: 2, alignItems: "center"}}>
                <Tooltip
                  arrow
                  PopperProps={{
                    disablePortal: true,
                  }}
                  
                  title={
                    <Typography
                      variant={"caption"}
                      gutterBottom
                      sx={{ textAlign: "left", height:"100px" }}
                    >
                      Please read the T&C thoroughly, so that you can move to
                      the next section.
                    </Typography>
                  }
                >
                  <Tooltip
                    arrow
                    PopperProps={{
                      disablePortal: true,
                    }}
                    title={
                      <Typography
                        variant={"caption"}
                        gutterBottom
                        sx={{ textAlign: "left", height:"100px" }}
                      >
                        Please read the T&C thoroughly, so that you can move to
                        the next section.
                      </Typography>
                    }
                  >
                    <InfoOutlinedIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: "18px",
                        ml: 0.4,
                        color: "#4843E9",
                      }}
                    />
                  </Tooltip>
                </Tooltip>

                <Box sx={{ ml: 1 }}>
                  <Link
                    className={classes.buttonLink}
                    onClick={() => router.push(`/merchants/${user.slug}/terms`)}
                    variant="body2"
                    gutterBottom
                    sx={{ textDecoration: "none", textDecorationLine:"underline", color:"#4843E9" }}
                  >
                    Terms and Conditions
                  </Link>
                </Box>
              </Box>
              {/*<Box
                sx={{ display: 'flex', px: 2, py: 2, alignItems: 'center' }}
                style={{
                  pointerEvents: `${isTermsAndCondition === true ? 'auto' : 'none'}`,
                }}
              >
                <InfoOutlinedIcon sx={{ color: '#306b95', fontSize: '100%' }} />
                <Box sx={{ ml: 1 }}>
                  <Link
                    className={classes.buttonLink}
                    onClick={() => router.push(`/merchants/${user.slug}/subscription-module`)}
                    variant='body2'
                    gutterBottom
                    sx={{textDecoration: 'none'}}
                  >
                    Subscription module
                  </Link>
                </Box>
              </Box>*/}
              <Box
                sx={{ display: "flex", px: 2, py: 2, alignItems: "center" }}
                style={{
                  pointerEvents: `${
                    isTermsAndCondition === true ? "auto" : "none"
                  }`,
                }}
              >
                <Tooltip
                  arrow
                  PopperProps={{
                    disablePortal: true,
                  }}
                  title={
                    <Typography
                      variant={"caption"}
                      gutterBottom
                      sx={{ textAlign: "left" }}
                    >
                      Once you have signed and uploaded the Merchant NDA form,
                      you can tick the box below and start your subscription.
                    </Typography>
                  }
                >
                  <Tooltip
                    arrow
                    PopperProps={{
                      disablePortal: true,
                    }}
                    title={
                      <Typography
                        variant={"caption"}
                        gutterBottom
                        sx={{ textAlign: "left" }}
                      >
                        Once you have signed and uploaded the Merchant NDA form,
                        you can tick the box below and start your subscription.
                      </Typography>
                    }
                  >
                    <InfoOutlinedIcon
                      sx={{
                        cursor: "pointer",
                        fontSize: "18px",
                        ml: 0.4,
                        color: "#4843E9",
                      }}
                    />
                  </Tooltip>
                </Tooltip>
                <Box sx={{ ml: 1 }}>
                  <Link
                    className={classes.buttonLink}
                    onClick={() =>
                      router.push(
                        `/merchants/${user.slug}/merchant-nda/${plan}`
                      )
                    }
                    variant="body2"
                    gutterBottom
                    sx={{ textDecoration: "none", color:"#4843E9", textDecorationLine:"underline" }}
                  >
                    Merchant NDA form
                  </Link>
                </Box>
              </Box>
              <Divider />
              <Box sx={{ px: 2, py: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ndaTrue}
                      onChange={(e) => setNdaTrue(e.target.checked)}
                    />
                  }
                  label="I agree to the terms and condition."
                  style={{
                    pointerEvents: `${isMerchants === true ? "auto" : "none"}`,
                  }}
                />
              </Box>
              {/* <Divider /> */}
              {/* <Box
                sx={{
                  px: 4,
                  py: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ mb: 0 }} variant='body2' gutterBottom component='h1'>
                  Subtotal
                </Typography>
                {subtotal}
              </Box> */}
              {/* <Divider /> */}
              {/* <Box
                sx={{
                  px: 4,
                  pt: 2,
                  pb: 4,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography sx={{ mb: 0, fontWeight: 'bold' }} variant='body2' gutterBottom component='h1'>
                  Total
                </Typography>
                {total}
              </Box> */}
              <Box
                sx={{ px: 4, py: 2, mb: 5 }}
                style={{
                  pointerEvents: `${ndaTrue === true ? "auto" : "none"}`,
                }}
              >
                {probutton}
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
