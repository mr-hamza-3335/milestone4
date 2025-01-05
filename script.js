document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    var resumeContainer = document.getElementById("resume-container");
    var profilePictureInput = document.getElementById("profile-picture");
    var profilePreview = document.getElementById("profile-preview");
    var displayProfile = document.getElementById("display-profile");
    var finalizeButton = document.getElementById("finalize-resume");
    // Update profile picture preview and dynamically update the resume picture
    profilePictureInput.addEventListener("change", function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                var result = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                profilePreview.src = result; // Update the preview in the form
                displayProfile.src = result; // Update the resume dynamically
            };
            reader.readAsDataURL(file);
        }
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Collect data from form inputs
        var name = document.getElementById("name").value;
        var title = document.getElementById("title").value;
        var email = document.getElementById("email").value;
        var contact = document.getElementById("contact").value;
        var address = document.getElementById("address").value;
        var objective = document.getElementById("objective").value;
        var educationItems = document.querySelectorAll(".education-item");
        var education = Array.from(educationItems).map(function (item) {
            var degree = item.querySelector(".degree").value;
            var year = item.querySelector(".year").value;
            return "".concat(degree, " (").concat(year, ")");
        });
        var skills = document.getElementById("skills").value.split(",");
        var experience = document.getElementById("experience").value.split(",");
        // Populate resume fields
        document.getElementById("display-name").textContent = name;
        document.getElementById("display-title").textContent = title;
        document.getElementById("display-email").textContent = email;
        document.getElementById("display-contact").textContent = contact;
        document.getElementById("display-address").textContent = address;
        document.getElementById("display-objective").textContent = objective;
        var educationList = document.getElementById("display-education");
        educationList.innerHTML = education.map(function (edu) { return "<li contenteditable=\"true\">".concat(edu, "</li>"); }).join("");
        var skillsList = document.getElementById("display-skills");
        skillsList.innerHTML = skills.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill.trim(), "</li>"); }).join("");
        var experienceList = document.getElementById("display-experience");
        experienceList.innerHTML = experience.map(function (exp) { return "<li contenteditable=\"true\">".concat(exp.trim(), "</li>"); }).join("");
        // Display resume and finalize button
        resumeContainer.style.display = "block";
        finalizeButton.style.display = "inline-block";
    });
    finalizeButton.addEventListener("click", function () {
        // Disable contenteditable attributes
        var editableFields = resumeContainer.querySelectorAll("[contenteditable='true']");
        editableFields.forEach(function (field) { return field.removeAttribute("contenteditable"); });
        // Hide the form and finalize button
        form.style.display = "none";
        finalizeButton.style.display = "none";
        alert("Resume has been finalized!");
    });
});
