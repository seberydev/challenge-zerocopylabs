const getUserDataFromClient = () => {
  const first = document.getElementById("first").value;

  const last = document.getElementById("last").value;

  const age = document.getElementById("age").value;

  const phone = document.getElementById("phone").value;

  const address = document.getElementById("address").value;

  const company = document.getElementById("company").value;

  const eyeColor = document.getElementById("eye").value;

  const picture = document.getElementById("picture").value;

  return {
    picture,
    eyeColor,
    company,
    address,
    phone,
    age,
    name: { first, last },
  };
};

const resetUserClientData = (data) => {
  document.getElementById("first").value = data.name.first;

  document.getElementById("last").value = data.name.last;

  document.getElementById("age").value = data.age;

  document.getElementById("phone").value = data.phone;

  document.getElementById("address").value = data.address;

  document.getElementById("company").value = data.company;

  document.getElementById("eye").value = data.eyeColor;

  document.getElementById("picture").value = data.picture;

  const pictureImgElement = document.getElementById("pictureImg");
  pictureImgElement.src = data.picture;
};

const getUser = async (url) => {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return { data };
  } catch (error) {
    return { error };
  }
};

const updateUser = async (url, updatedData) => {
  try {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    return { error };
  }
};

const main = async () => {
  const userUrl = `${window.location.href}api/user`;

  let { data } = await getUser(userUrl);

  resetUserClientData(data);

  const balanceText = document.getElementById("balanceText");
  balanceText.textContent = data.balance;

  const saveBtn = document.getElementById("saveBtn");
  saveBtn.addEventListener("click", async () => {
    if (saveBtn.classList.contains("active")) return;

    const userData = getUserDataFromClient();
    saveBtn.classList.add("active");
    await updateUser(userUrl, userData);
    saveBtn.classList.remove("active");
    data = userData;
    resetUserClientData(data);
  });

  const resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", () => {
    resetUserClientData(data);
  });

  const editBtn = document.getElementById("editBtn");
  const balanceBtn = document.getElementById("balanceBtn");

  const editFormContainer = document.getElementById("editFormContainer");
  const balanceContainer = document.getElementById("balanceContainer");

  editBtn.addEventListener("click", () => {
    editFormContainer.style.display = "block";
    balanceContainer.style.display = "none";
    editBtn.classList.add("active");
    balanceBtn.classList.remove("active");
  });

  balanceBtn.addEventListener("click", () => {
    balanceContainer.style.display = "block";
    editFormContainer.style.display = "none";
    balanceBtn.classList.add("active");
    editBtn.classList.remove("active");
  });
};

window.addEventListener("load", main);
