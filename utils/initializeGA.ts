import ReactGA from "react-ga";

const trackingId = "UA-159366701-1";
ReactGA.initialize(trackingId);
ReactGA.set({
  // any data that is relevant to the user session
  // that you would like to track with google analytics
});
