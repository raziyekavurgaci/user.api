const fetchUserDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const userData = await response.json();
    console.log(userData);
    displayUserDetails(userData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayUserDetails = (users) => {
  const detailContainer = document.getElementById("detailContainer");
  detailContainer.innerHTML = "";
  users.forEach((user) => {
    const userDetailCard = `
    <div class="mt-5 d-flex text-center">
      <div class="card w-100">
        <div class="card-body">
          <h5 class="card-title">
            ${user.id}
          </h5>
          <div>
            <p class="card-text">${user.title}</p>
            <p class="card-text">${user.body}</p>
          </div>
        </div>
      </div>
    </div>
    `;
    detailContainer.innerHTML += userDetailCard;
  });
};

fetchUserDetails();
