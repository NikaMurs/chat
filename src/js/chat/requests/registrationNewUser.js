export default async function registrationNewUser(user) {
  const response = await fetch(
    "https://chatbackend-nl2s.onrender.com" + "/registrationNewUser",
    //"http://localhost:7070" + "/registrationNewUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  return response;
}
