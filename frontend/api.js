export const  authToken = localStorage.getItem("token");


export const getMeetingId = async (token) => {
  try {
    //We will use VideoSDK rooms API endpoint to create a meetingId
    const VIDEOSDK_API_ENDPOINT = `https://api.videosdk.live/v2/rooms`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // We will pass the token in the headers
        Authorization: `${token}`,
      },
    };
    const meetingId = await fetch(VIDEOSDK_API_ENDPOINT, options)
      .then(async (result) => {
        const { roomId } = await result.json();
        return roomId;
      })
      .catch((error) => console.log("error", error));

    //we will return the meetingId which we got from the response of the api
    return meetingId;
  } catch (e) {
    console.log(e);
  }
};
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};