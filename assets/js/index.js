const hashGen = () => {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const whole = lower + upper + digits;
  const hashString = whole
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .slice(0, 8);
  const hash = hashString.join("");
  return hash;
};
const save = () => {
  var a = document.getElementById("download");
  var content =
    "<style>h1, h2, h3, h4, h5, h6, p, a{font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;} a{color: rgb(15, 2, 249); text-decoration: none;} img{width: 80%;} pre{font-family: 'Fira Code', 'Courier New', Courier, monospace; background - color: #d2d5d3; padding: 12px; border - radius: 12px; border: 2px solid #000; } blockquote{background-color: #d2d5d3;padding: 2px;border-radius: 12px;width: 50%;margin: 0px;border: 2px solid #000;}</style>" +
    marked.parse(document.getElementById("text").value);
  var file = new Blob([content], { type: "html" });
  a.href = URL.createObjectURL(file);
  a.download = hashGen() + ".html";
};

const md_save = () => {
  var a = document.getElementById("md_download");
  var content = document.getElementById("text").value;
  var file = new Blob([content], { type: "md/text" });
  a.href = URL.createObjectURL(file);
  a.download = hashGen() + ".md";
};

//Code for closing a notification if already open
const closeToast = () => {
  const toastElements = document.querySelectorAll(".toastify");
  toastElements.forEach((element) => {
    element.parentNode.removeChild(element);
  });
};

//CODE for showing the notification
const showToast = (message) => {
  Toastify({
    text: message,
    duration: 3000, //3 seconds or 3000ms
    close: true,
    gravity: "top",
    position: "left",
  }).showToast();
};

const copy = () => {
  navigator.clipboard.writeText(marked.parse($("#text").val()));
  closeToast();
  showToast("Copied HTML Code to clipboard");
};

const md_copy = () => {
  navigator.clipboard.write($("text").val());
  closeToast();
  showToast("Copied Markdown Code to clipboard");
};

const pop = () => {
  var pop_window = window.open(
    "",
    "HTMl Content",
    "toolbar=yes,status=no,menubar=yes,scrollbars=yes,resizable=yes"
  );
  pop_window.document.body.innerHTML =
    "<style>h1, h2, h3, h4, h5, h6, p, a{font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;} a{color: rgb(15, 2, 249); text-decoration: none;} img{width: 80%;border-radius:12px;} pre{font-family: 'Fira Code', 'Courier New', Courier, monospace; background - color: #d2d5d3; padding: 12px; border - radius: 12px; border: 2px solid #000; } blockquote{background-color: #d2d5d3;padding: 2px;border-radius: 12px;width: 50%;margin: 0px;border: 2px solid #000;}</style>" +
    marked.parse(document.getElementById("text").value);
  pop_window.document.title = "HTML Content";
};
function displayContents(contents) {
  var md_content = document.getElementById("text");
  md_content.value = contents;
  document.getElementById("content").innerHTML = marked.parse(
    document.getElementById("text").value
  );
}
const prep = () => {
  if (localStorage.getItem("content") == null) {
    localStorage.setItem("content", "");
  }
  console.log(localStorage.getItem("content"));
  document.getElementById("text").value = localStorage
    .getItem("content")
    .toString();
  displayContents(localStorage.getItem("content").toString());
};

window.onload = prep();
$(document).ready(function () {
  $("#text").keyup(() => {
    document.getElementById("content").innerHTML = marked.parse(
      $("#text").val()
    );
    hljs.highlightAll();
    localStorage.setItem("content", $("#text").val());
  });
  $("#file").change(function (event) {
    const reader = new FileReader();
    file = event.target.files[0];
    if (!file) {
      return;
    }
    reader.onload = function (e) {
      var contents = e.target.result;
      displayContents(contents);
    };
    reader.readAsText(file);
  });
});
