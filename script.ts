document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const resumeContainer = document.getElementById("resume-container") as HTMLElement;
    const profilePictureInput = document.getElementById("profile-picture") as HTMLInputElement;
    const profilePreview = document.getElementById("profile-preview") as HTMLImageElement;
    const displayProfile = document.getElementById("display-profile") as HTMLImageElement;
    const finalizeButton = document.getElementById("finalize-resume") as HTMLButtonElement;
  
    // Update profile picture preview and dynamically update the resume picture
    profilePictureInput.addEventListener("change", (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          profilePreview.src = result; // Update the preview in the form
          displayProfile.src = result; // Update the resume dynamically
        };
        reader.readAsDataURL(file);
      }
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Collect data from form inputs
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const title = (document.getElementById("title") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const contact = (document.getElementById("contact") as HTMLInputElement).value;
      const address = (document.getElementById("address") as HTMLTextAreaElement).value;
      const objective = (document.getElementById("objective") as HTMLTextAreaElement).value;
  
      const educationItems = document.querySelectorAll(".education-item");
      const education: string[] = Array.from(educationItems).map((item) => {
        const degree = (item.querySelector(".degree") as HTMLInputElement).value;
        const year = (item.querySelector(".year") as HTMLInputElement).value;
        return `${degree} (${year})`;
      });
  
      const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(",");
      const experience = (document.getElementById("experience") as HTMLTextAreaElement).value.split(",");
  
      // Populate resume fields
      (document.getElementById("display-name") as HTMLElement).textContent = name;
      (document.getElementById("display-title") as HTMLElement).textContent = title;
      (document.getElementById("display-email") as HTMLElement).textContent = email;
      (document.getElementById("display-contact") as HTMLElement).textContent = contact;
      (document.getElementById("display-address") as HTMLElement).textContent = address;
      (document.getElementById("display-objective") as HTMLElement).textContent = objective;
  
      const educationList = document.getElementById("display-education")!;
      educationList.innerHTML = education.map((edu) => `<li contenteditable="true">${edu}</li>`).join("");
  
      const skillsList = document.getElementById("display-skills")!;
      skillsList.innerHTML = skills.map((skill) => `<li contenteditable="true">${skill.trim()}</li>`).join("");
  
      const experienceList = document.getElementById("display-experience")!;
      experienceList.innerHTML = experience.map((exp) => `<li contenteditable="true">${exp.trim()}</li>`).join("");
  
      // Display resume and finalize button
      resumeContainer.style.display = "block";
      finalizeButton.style.display = "inline-block";
    });
  
    finalizeButton.addEventListener("click", () => {
      // Disable contenteditable attributes
      const editableFields = resumeContainer.querySelectorAll("[contenteditable='true']");
      editableFields.forEach((field) => field.removeAttribute("contenteditable"));
  
      // Hide the form and finalize button
      form.style.display = "none";
      finalizeButton.style.display = "none";
  
      alert("Resume has been finalized!");
    });
  });
  