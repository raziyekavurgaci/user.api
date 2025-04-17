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
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <div class="text-center mb-3">
              <img src="https://ui-avatars.com/api/?name=${user.name}&background=3a4dc1&color=fff&size=128" class="rounded-circle mb-3" alt="${user.name}">
              <h5 class="card-title">
                ${user.name}
              </h5>
              <span class="badge bg-light text-dark mb-3">@${user.username}</span>
            </div>
            <div class="user-details">
              <p><i class="fas fa-map-marker-alt"></i> ${user.address.city}, ${user.address.street}</p>
              <p><i class="fas fa-envelope"></i> ${user.email}</p>
              <p><i class="fas fa-phone"></i> ${user.phone}</p>
              <p><i class="fas fa-globe"></i> ${user.website}</p>
              <div class="text-center mt-auto">
                <a href="detail.html?id=${user.id}" class="btn btn-outline-dark w-100"><i class="fas fa-info-circle me-2"></i>Profili Görüntüle</a>
              </div>
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
    showAlert("Lütfen 1 ile 10 arasında bir kullanıcı ID'si girin!", "danger");
  }
});

const showAlert = (message, type) => {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
  alertDiv.role = "alert";

  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  const container = document.querySelector(".container");
  const searchForm = document.getElementById("searchForm");
  container.insertBefore(alertDiv, searchForm.parentElement.nextElementSibling);

  // 5 saniye sonra uyarıyı kaldır
  setTimeout(() => {
    alertDiv.remove();
  }, 5000);
};

window.onload = () => {
  fetchUsers();
};
