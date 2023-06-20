function simpanData() {
  var username = document.getElementById("username").value;
  if (username === "") {
    alert("Please enter a username.");
  } else {
  // Simpan nilai input ke Local Storage
  localStorage.setItem('dataPengguna', username);
  // Kosongkan input setelah disimpan
  window.location = 'menu-category.html';

  }
}