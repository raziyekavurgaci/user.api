const fetchUserDetails = async () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get("id");

  try {
    // Kullanıcı bilgilerini al
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    const userData = await userResponse.json();

    // Kullanıcı gönderilerini al
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const postsData = await postsResponse.json();

    // Sayfa başlığını güncelle
    document.querySelector(
      "h1"
    ).innerHTML = `<i class="fas fa-user-circle me-2"></i> ${userData.name} Detayları`;

    displayUserDetails(postsData);
  } catch (error) {
    console.error("Error fetching data:", error);
    showError("Veriler yüklenirken bir hata oluştu!");
  }
};

const displayUserDetails = (posts) => {
  const detailContainer = document.getElementById("detailContainer");

  if (posts.length === 0) {
    detailContainer.innerHTML = `
      <div class="alert alert-info text-center">
        <i class="fas fa-info-circle me-2"></i> Bu kullanıcıya ait gönderi bulunamadı.
      </div>
    `;
    return;
  }

  detailContainer.innerHTML = "";

  posts.forEach((post, index) => {
    const postNumber = index + 1;
    const randomColor = getRandomColor();

    const userDetailCard = `
    <div class="row justify-content-center mb-4">
      <div class="col-md-10">
        <div class="card">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <div class="post-number me-3" style="background-color: ${randomColor}; color: white; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;">
                ${postNumber}
              </div>
              <h5 class="card-title mb-0">
                ${post.id}
              </h5>
            </div>
            <div>
              <p class="card-text">${post.title}</p>
              <p class="card-text">${post.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    detailContainer.innerHTML += userDetailCard;
  });
};

const showError = (message) => {
  const detailContainer = document.getElementById("detailContainer");
  detailContainer.innerHTML = `
    <div class="alert alert-danger text-center">
      <i class="fas fa-exclamation-triangle me-2"></i> ${message}
    </div>
  `;
};

const getRandomColor = () => {
  const colors = [
    "#3a4dc1",
    "#4CAF50",
    "#FF5722",
    "#9C27B0",
    "#2196F3",
    "#FF9800",
    "#795548",
    "#607D8B",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

fetchUserDetails();
