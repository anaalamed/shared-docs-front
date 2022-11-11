const registration = async () => {
  const user = {
    name: $(".field_wrapper #name").val(),
    email: $(".field_wrapper #email").val(),
    password: $(".field_wrapper #password").val(),
  };

  fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      console.log("success");
    })
    .catch((error) => {
      console.error("error: ", error);
    });
};

$("#registration_form").on("submit", function (e) {
  e.preventDefault();
  console.log("sign up");
  registration();
});
