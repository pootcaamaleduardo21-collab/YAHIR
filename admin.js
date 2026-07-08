const form = document.querySelector("#contentForm");
const statusMessage = document.querySelector("#adminStatus");
const baseContent = window.YAHIR_SITE_CONTENT || {};
const savedContent = JSON.parse(localStorage.getItem("yahirSiteContent") || "{}");
const activeContent = { ...baseContent, ...savedContent };

Object.entries(activeContent).forEach(([key, value]) => {
  const field = form.elements[key];
  if (field) field.value = value;
});

function readFormContent() {
  return [...new FormData(form).entries()].reduce((content, [key, value]) => {
    content[key] = String(value).trim();
    return content;
  }, {});
}

function showStatus(message) {
  statusMessage.textContent = message;
}

document.querySelector("#saveContent").addEventListener("click", () => {
  localStorage.setItem("yahirSiteContent", JSON.stringify(readFormContent()));
  showStatus("Cambios guardados para previsualizar en este navegador.");
});

document.querySelector("#exportContent").addEventListener("click", () => {
  const fileBody = `window.YAHIR_SITE_CONTENT = ${JSON.stringify(readFormContent(), null, 2)};\n`;
  const blob = new Blob([fileBody], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "content.js";
  link.click();
  URL.revokeObjectURL(url);
  showStatus("Archivo content.js exportado. Reemplazalo en el proyecto para publicar esos cambios.");
});

document.querySelector("#resetContent").addEventListener("click", () => {
  localStorage.removeItem("yahirSiteContent");
  Object.entries(baseContent).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
  showStatus("Contenido base restaurado en este navegador.");
});
