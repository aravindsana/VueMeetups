const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const {error} = require("firebase-functions/logger");
admin.initializeApp();

// const cors = require("cors")({origin: true});


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  // for background triggers you must return a value/promise
  return admin.firestore().collection("users").doc(user.uid).set({
    id: user.uid,
    registeredMeetups: [],
    fbKeys: {},
  });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});


// http callable function (adding a request)
exports.addRequest = functions.https.onCall( (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests",
    );
  }


  const meetupdata = {
    title: data.title,
    location: data.location,
    description: data.description,
    date: data.date,
    creatorId: data.creatorId,
  };

  const meetups = admin.firestore().collection("meetups");
  const users = admin.firestore().collection("users").doc(context.auth.uid);

  const bucket = admin.storage().bucket();


  return meetups.add(meetupdata)
      .then( (writeResult) => {
        console.log(writeResult.id);
        // console.log(typeof writeResult)

        users.update({
          registeredMeetups: admin.firestore
              .FieldValue.arrayUnion(writeResult.id),
        });

        const image = data.image;
        const mimeType = image
            .match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
        const fileName = writeResult.id;
        const base64EncodedImageString = image
            .replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64EncodedImageString, "base64");

        // Upload the image to the bucket
        const file = bucket.file("meetups/" + fileName);

        file.save(imageBuffer, {
          metadata: {contentType: mimeType},
          public: true,
          validation: "md5",
        });

        return writeResult.id;
      });
});


exports.updateImageLink = functions.storage.bucket().object("meetups")
    .onFinalize( (object) => {
      // console.log("obbb", object)
      const meetupid = object.name.split("/")[1];
      const mediaLink = object.mediaLink;

      const meetups = admin.firestore().collection("meetups").doc(meetupid);

      console.log("meetup_id", meetupid);

      return meetups.update({
        imageUrl: mediaLink,
      });
    });


exports.registerMeetup = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests",
    );
  }

  console.log(data.userid);
  console.log(data.meetup_id);

  const meetupid = data.meetup_id;

  const registrations = admin.firestore().collection("registrations")
      .doc(data.userid).collection("registered");


  try {
    const result = await registrations.add({
      meetup_id: meetupid,
    });
    console.log(result.id);

    const users = admin.firestore()
        .collection("users").doc(context.auth.uid);

    return users.update({
      "registeredMeetups": admin.firestore
          .FieldValue.arrayUnion(meetupid),
      [`fbKeys.${meetupid}`]: result.id,
    })
        .then(() => {
          return "registered";
        });
  } catch (error) {
    console.log(error);
  }
});


exports.UnregisterMeetup = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "only authenticated users can add requests",
    );
  }

  console.log(data.userid);
  console.log(data.fbKey);

  const userid = data.userid;

  const fbKey = data.fbKey;

  const meetupid = data.meetupid;

  console.log(meetupid);

  const registrations = admin.firestore().collection("registrations")
      .doc(userid).collection("registered");


  try {
    const result = await registrations.doc(fbKey).delete();
    console.log(result);

    const users = admin.firestore()
        .collection("users").doc(context.auth.uid);

    return users.update({
      "registeredMeetups": admin.firestore
          .FieldValue.arrayRemove(meetupid),
      [`fbKeys.${meetupid}`]: admin.firestore.FieldValue.delete(),
    })
        .then(() => {
          return "unregistered";
        });
  } catch (error) {
    console.log(error);
  }
});

