Events:

```
{
"id": "db-dev/user-metadata/portfolios/meta/pending/UGG3gdiCCpbUBmBWXK20jYM8WiH2/events-collection/img**1646318209934**vlcsnap-2021-09-03-13h39m01s796.png",
"name": "Test Event",
"price": 1000,
"currency": "INR",
"audienceCapacity": 100,
"imageLocation": "db-dev/user-metadata/portfolio/events/UGG3gdiCCpbUBmBWXK20jYM8WiH2/img**1646318209934**vlcsnap-2021-09-03-13h39m01s796.png",
"createdAt": "2022-03-03T14:36:51.504Z",
"fileType": "image/png",
"fileName": "img**1646318209934**vlcsnap-2021-09-03-13h39m01s796.png",
"state": "Tamil Nadu",
"city": "Chennai",
"venue": "Guindi",
"startDate": "2022-03-03T12:40:52.541Z",
"startDay":"Thursday",
"startHour":8,
"startMinute":30,
"endDate": "2022-03-23T12:00:52.000Z",
"endDay":"Monday",
"endHour":12,
"endMinute":30,
"category": "Photography",
"subCategory": "Nature Photography",
"about": "Just a normal Event",
"aboutHost": "Software Engineer in India",
"hostType": "Self",
"hostDescription": "",
"termsAndConditions": "1. Food would be provided on first come first serve basis",
"lng": 0,
"lat": 0,
"imageUri": "https://storage.googleapis.com/break-free-45883.appspot.com/db-dev/user-metadata/portfolio/",
"uid": "UGG3gdiCCpbUBmBWXK20jYM8WiH2"
}
State:- [Fixed Options that are present in: src\local\cities.json
City:- [Fixed Options that are present in: src\local\cities.json
Venue:- Any Random String
startDate:- Date ISO String [Along with Date,Time,Day,Hour, Minute]
endDate:- Date ISO String [Along with Date,Time,Day,Hour, Minute]
Duration: From toTime to endTime [Start Time & End Time]

Categories:- ["Actors", "Anchors", "Art", "Bloggers", "Ca’s", "Chefs", "Comedy", "Dance", "Designers", "Djs", "Drama", "Fashion", "Lawyer’s", "Music", "Photography", "Rap", "Software", "Wellness", "Writers"]
Endpoint to Update Categories (Only Via Admin Account):- http://localhost:3000/api/v2/admin/categories/update-categories
Payload Example:-
{
"firebaseToken":"eyJhbGciOiJSUzI1NiIsImtpZCI6ImNmNWQ4ZTc0ZjNjNDg2ZWU1MDNkNWVlYzkzYTEwMWM2NGJhY2Y3ZGEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2hpdmFtIFNhaGlsIiwiYWRtaW5BcHByb3ZlZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JyZWFrLWZyZWUtNDU4ODMiLCJhdWQiOiJicmVhay1mcmVlLTQ1ODgzIiwiYXV0aF90aW1lIjoxNjQ2MzE4MTIyLCJ1c2VyX2lkIjoiVUdHM2dkaUNDcGJVQm1CV1hLMjBqWU04V2lIMiIsInN1YiI6IlVHRzNnZGlDQ3BiVUJtQldYSzIwallNOFdpSDIiLCJpYXQiOjE2NDYzMTgxMjIsImV4cCI6MTY0NjMyMTcyMiwiZW1haWwiOiJhY3Rpdml0eS5zY2hvb2xzaDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBob25lX251bWJlciI6Iis5MTk2NTU1NTgxNzQiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis5MTk2NTU1NTgxNzQiXSwiZW1haWwiOlsiYWN0aXZpdHkuc2Nob29sc2gyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.N-azgDX-BpcH3ptO_j0ed5Gpc0jya47ug_f2ym09fCxOtgGDPI-1UzKXGullfeol_y_UD6nns1IW3C6y2lTLpDoat7OOdvTMDiD200W6clne-2HgE0JlI17yCUhotgnnFq0ldXVuL_YigPthqFKBp1RSO44hHzcqsto4zrviPv0ocnyf50G_vM9gqS7JxHBhNhHnWT91kjxvT-KpAKL4MEwsG2RENEVbWDg03LLkcR0o1oMOabL26gTA8m5F1xYeAvWjEFibzMOBZNergKZiplwND3EgwtieWSrjYD2X2_zCrnQZ1tmELpvEWM356SPliBj4hZzZ6CCHLZQsLp69qA",
"categories": ["Actors", "Anchors", "Art", "Bloggers", "Ca’s", "Chefs", "Comedy", "Dance", "Designers", "Djs", "Drama", "Fashion", "Lawyer’s", "Music", "Photography", "Rap", "Software", "Wellness", "Writers"]
}
```

About the Event:- string
About the Host:- string [Won't be present if Hosting is done by self and so accordingly replace it with User's Bio]
Hosting: Self | Others
View on Map:- [lat,lng:- fixed to 0,0 kept for future addition, currently stays static]
Terms and Conditions Entry

Services:
Add Language Dropdown [List applicable]
Filter: State and City and Venue [These fields will be added, state and city would be dropdown list and venue will be any random string]

FE - Service Name [Taken From Form] - 1
FE - Bio - Taken from User Info [Also Included in Form] - 2
FE - Languages - Taken from User Info [Also Included in Form] - 3 - DD
FE - Genre [Dropdown] - Added in Form [Also Included in Form] - 4 - DD
FE - Gender Dropdown - Taken from User Info [If not present then taken as Other] [Also Included in Form] - 5 - DD
FE - NationWide: PAN India [Yes | No] [Included in Form] - 6 - RB
FE - Profession [Text Field] [Included in Form] - 7 - TF
FE - City [Included in Form] - 8 - DD
FE - Service Image - 10
BE - creator_uid [Taken From User Info: From Backend]
BE - creator_name [Taken From User Info: From Backend]
BE - creator_dp_url [Taken From User Info: From Backend]

Products: [We will add the following]
Categories [Single Dropdown Option]
product pricing [Input Field]
fixed price [Input Field]
discount: % [Do we need this? or the above two will suffice?] [To be calculated from BE]

0. Do the Form Validation:

   - Product Name can't be empty
   - None of the Prices can less than or equal to Zero
   - Discounted Price Must be Less than Fixed Price
   - Categories must match with one of the available Categories

1. Add one entry in FE Form
2. Add Discount from Backend
3. Add Categories

Urgent Request Screen: Yes/No [UI Only]

Example of How these objects appear in Firebase:

```
"portfolioData": {
            "title": "First Portfolio",
            "generation": "1646558495508204",
            "modifiedAt": "2022-03-06T09:21:37.899Z",
            "createdAt": "2022-03-06T09:21:37.899Z",
            "fullPath": "db-dev/user-metadata/portfolio/images/UGG3gdiCCpbUBmBWXK20jYM8WiH2/image_1646558495672_gallery.jpg",
            "metadata": {
                "name": "Shivam Sahil",
                "uid": "UGG3gdiCCpbUBmBWXK20jYM8WiH2"
            },
            "fileName": "gallery.jpg",
            "textContent": "First Portfolio",
            "uid": "UGG3gdiCCpbUBmBWXK20jYM8WiH2",
            "fp": "image_1646558495672_gallery.jpg"
        },
        "eventData": {
            "lat": 0,
            "endHour": 9,
            "startDate": "2022-03-06T09:21:08.646Z",
            "serviceSubscription": {
                "rejected": [],
                "requested": [],
                "approved": []
            },
            "hostPoint": "In Person",
            "endMinute": 21,
            "city": "Delhi",
            "totalBookings": 0,
            "startMinute": 21,
            "fileType": "image/jpeg",
            "endDay": "Sunday",
            "uid": "UGG3gdiCCpbUBmBWXK20jYM8WiH2",
            "name": "Second Event Rejected",
            "category": "Music",
            "createdAt": "2022-03-06T09:26:00.570Z",
            "state": "Delhi",
            "lastModifiedBy": "User",
            "creator_name": "Shivam Sahil",
            "price": 1000,
            "termsAndConditions": "",
            "endDate": "2022-03-06T09:21:08.646Z",
            "hostDescription": "",
            "aboutHost": "Software Engineer in India",
            "startDay": "Sunday",
            "venue": "",
            "endTimeStamp": 1646558468646,
            "currency": "INR",
            "subCategory": "",
            "modifiedAt": "2022-03-06T09:28:09.866Z",
            "lng": 0,
            "id": "db-dev/user-metadata/portfolios/meta/rejected/UGG3gdiCCpbUBmBWXK20jYM8WiH2/events-collection/img__1646558759807__gallery.jpg",
            "audienceCapacity": 100,
            "hostType": "Self",
            "about": "",
            "startHour": 9,
            "fileName": "img__1646558759807__gallery.jpg",
            "startTimeStamp": 1646558468646,
            "isDeleted": false,
            "imageLocation": "db-dev/user-metadata/portfolio/events/UGG3gdiCCpbUBmBWXK20jYM8WiH2/img__1646558759807__gallery.jpg"
        },
        "serviceData": {
            "serviceSubscription": {
                "approved": [],
                "requested": [],
                "rejected": [],
                "approvedByAdmin": []
            },
            "creator_name": "Shivam Sahil",
            "serviceLanguage": "English",
            "creator_dp_loc": "db-dev/user-metadata/portfolio/profile-pictures/UGG3gdiCCpbUBmBWXK20jYM8WiH2__gallery.jpg",
            "serviceState": "Delhi",
            "serviceImageLoc": "image_1646558735890_gallery.jpg",
            "lastModifiedBy": "User",
            "serviceFileType": "image/jpeg",
            "id": "db-dev/user-metadata/portfolios/meta/rejected/UGG3gdiCCpbUBmBWXK20jYM8WiH2/services-collection/image_1646558735890_gallery.jpg",
            "servicePricing": 100,
            "serviceCity": "Delhi",
            "currency": "INR",
            "serviceMaxCapacity": "Engineer",
            "serviceDuration": "Actors",
            "panIndia": true,
            "serviceName": "Second Service Rejected",
            "serviceDescription": "",
            "creator_uid": "UGG3gdiCCpbUBmBWXK20jYM8WiH2",
            "modifiedAt": "2022-03-06T09:28:28.704Z",
            "imageStorageLoadPath": "",
            "createdAt": "2022-03-06T09:25:38.036Z",
            "serviceGender": "Male",
            "absImagePath": "db-dev/user-metadata/portfolio/services/UGG3gdiCCpbUBmBWXK20jYM8WiH2/image_1646558735890_gallery.jpg"
        },
        "productData": {
            "productCategory": "Actors",
            "productDetails": "First Product",
            "images": [
                {
                    "imageAbsPath": "db-dev/user-metadata/portfolio/products/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products_1646558608513__6360551/img_1646558608513_0_gallery.jpg",
                    "firebaseFolderLocation": "db-dev/user-metadata/portfolio/products/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products_1646558608513__6360551",
                    "imageExpiryTimeStamp": 1646566045027,
                    "imageName": "img_1646558608513_0_gallery.jpg",
                    "imageType": "image/jpeg",
                    "imagePreview": "https://storage.googleapis.com/break-free-45883.appspot.com/db-dev/user-metadata/portfolio/products/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products_1646558608513__6360551/img_1646558608513_0_gallery.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-8gtur%40break-free-45883.iam.gserviceaccount.com%2F20220306%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220306T092725Z&X-Goog-Expires=7200&X-Goog-SignedHeaders=host&X-Goog-Signature=196f4470d76853ad67cd3de963b5da368377eeb56c1195484c5c07d84684709708f936c7178bbefdab48daf3a5d38e87ee7695dc53687461257b290620defb1905b436bdb0702bd4139843baad26d63d1188d60fd57924491404074b1ae23da62fe1e2e292631aa4c6db775186d3bb931574a5e9304d413fb6d691003b5c3d4751dad8fb40297fdce2b55600b47c80ee1d4c9198f540cf5913d852ab96f2068a2544f4481967ac34b4c14f6a59e87a0c01c44041aa4b6ff3f9bb49a673b6832d90bd477d5f56b8d3fe4dd64ee83aca6f1e0c66c08c37945c1d95e34d548c9b10c9298f03f2a04ab061e7acd1ee6beafa7787b87e66edcb86d19d7efc96276f7c"
                }
            ],
            "discountedPrice": 90,
            "uid": "UGG3gdiCCpbUBmBWXK20jYM8WiH2",
            "productName": "First Product",
            "productCurrencyType": "INR",
            "productPrice": 1000,
            "createdAt": 1646558609927,
            "storageFolderRef": "db-dev/user-metadata/portfolio/products/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products_1646558608513__6360551",
            "id": "db-dev/user-metadata/portfolios/meta/rejected/UGG3gdiCCpbUBmBWXK20jYM8WiH2/products-collection/products_1646558608513__6360551",
            "modifiedAt": 1646558855448,
            "creator_name": "Shivam Sahil"
        }



```
