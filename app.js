const stages = [
  { id: "commit", text: "Commit received on main." },
  { id: "test", text: "Tests passed." },
  { id: "build", text: "Build artifact created." },
  { id: "deploy", text: "Deployed to the demo environment." }
];

const runButton = document.getElementById("runBtn");
const status = document.getElementById("status");
const log = document.getElementById("log");
const stageElements = document.querySelectorAll(".stage");

document.getElementById("year").textContent = new Date().getFullYear();

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function resetStages() {
  stageElements.forEach((stage) => {
    stage.classList.remove("running", "done");
  });
  log.innerHTML = "";
}

runButton.addEventListener("click", async () => {
  runButton.disabled = true;
  resetStages();
  status.textContent = "Pipeline is running.";

  for (const stage of stages) {
    const element = document.querySelector(`[data-stage="${stage.id}"]`);
    element.classList.add("running");
    status.textContent = stage.id.charAt(0).toUpperCase() + stage.id.slice(1) + " in progress.";
    await wait(700);
    element.classList.remove("running");
    element.classList.add("done");

    const item = document.createElement("li");
    item.textContent = stage.text;
    log.appendChild(item);
  }

  status.textContent = "Pipeline finished. All four stages passed.";
  runButton.disabled = false;
});
