const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    displayUsers(users);
    console.log(users);
  } catch (error) {
    console.error("Error fetching users", error);
  }
};

fetchUsers();

const displayUsers = (users) => {
  const container = document.getElementById("user-cards");
  container.innerHTML = "";
  users.forEach((user) => {
    const userCardsHTML = `
      <div class="text-center d-flex mb-4">
        <div class="card w-100">
          <div class="card-body d-flex flex-column">
            <h5 class"card-title user-name">
            ${user.name}
            </h5>
            <div class="user-details">
              <p><i class="fa-regular fa-user"></i>${user.username}</p>
              <p>${user.address.city} ${user.address.street}</p>
              <p>${user.email}</p>
              <p>${user.phone}</p>
              <p>${user.website}</p>
              <a href="detail.html?id=${user.id}" class="btn btn-outline-dark">View Profile</a>
            </div>
            
          </div>
        </div>
      </div>
    `;
    container.innerHTML += userCardsHTML;
  });
};

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userId = document.getElementById("searchInput").value;
  const userIdNumber = parseInt(userId);
  if (userIdNumber >= 1 && userIdNumber <= 10) {
    window.location.href = `detail.html?id=${userId}`;
  } else {
    alert("STOP IT");
  }
});
window.onload = () => {
  fetchUsers();
};
