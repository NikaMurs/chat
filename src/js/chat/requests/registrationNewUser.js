export default async function registrationNewUser(user) {
  const response = await fetch(
    "https://chatbackend-nl2s.onrender.com" + "/registrationNewUser",
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
