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
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const data = isJson && (await response.json());

      if (!response.ok) {
        const error = (data && data.message) || response.status;
        $(".modal-title").text("Registration failed");
        $(".modal-body").text(error);
        return Promise.reject(error);
      }

      $(".modal-title").text("Registration success");
      $(".modal-body").text("Please log in!");
    })
    .catch((error) => {
      console.error("error: ", error);
    });
};

$("#registration_form").on("submit", function (e) {
  e.preventDefault();
  registration();
});

$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});
