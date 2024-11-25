document.addEventListener("DOMContentLoaded", () => {
    
    function updateCV() {
       
        const firstName = document.getElementById("firstname").value;
        const lastName = document.getElementById("lastname").value;
        const designation = document.getElementById("designation").value;
        const phoneNo = document.getElementById("phoneno").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
        const summary = document.getElementById("summary").value;

        const skills = Array.from(document.querySelectorAll(".skill"))
            .map(skillInput => skillInput.value)
            .filter(skill => skill.trim() !== "").join(", ");

        const achievements = getRepeaterData(".Achievementspx", ".achieve_title", ".achieve_description");
        const experience = getRepeaterData(".experiencep", ".title", ".organization", ".location", ".start-date", ".end-date", ".ex-description");
        const education = getRepeaterData(".educationp", ".edu-school", ".edu-degree", ".edu-city", ".edu-start-d", ".edu-graduation-d", ".edu-description");
        const projects = getRepeaterData(".proj-cv", ".proj-title", ".proj-link", ".proj-description");

        document.querySelector(".photofile").src = document.getElementById("image").files[0] 
            ? URL.createObjectURL(document.getElementById("image").files[0]) 
            : "";
        
        document.querySelector(".i1").innerHTML = `${firstName} ${lastName}`;
        document.querySelector(".i2").innerHTML = designation;
        document.querySelector(".i3").innerHTML = phoneNo;
        document.querySelector(".i4").innerHTML = email;
        document.querySelector(".i5").innerHTML = address;
        document.querySelector(".i6").innerHTML = summary;

        document.querySelector(".sil").innerHTML = skills ? `<span>${skills}</span>` : '';

        document.querySelector(".Achievementspx").innerHTML = achievements;
        document.querySelector(".experiencep").innerHTML = experience;
        document.querySelector(".educationp").innerHTML = education;
        document.querySelector(".proj-cv").innerHTML = projects;

       
        saveToLocalStorage();
    }

  
    function getRepeaterData(containerSelector, ...fieldSelectors) {
        let content = '';
        const fields = document.querySelectorAll(fieldSelectors[0]);
        fields.forEach((_, index) => {
            let itemContent = '';
            fieldSelectors.forEach(selector => {
                const value = document.querySelectorAll(selector)[index]?.value || "";
                if (value.trim() !== "") {
                    itemContent += `<p>${value}</p>`;
                }
            });
            if (itemContent) {
                content += `<div>${itemContent}</div>`;
            }
        });
        return content;
    }

   
    function saveToLocalStorage() {
        const cvData = {
            firstname: document.getElementById("firstname").value,
            lastname: document.getElementById("lastname").value,
            designation: document.getElementById("designation").value,
            phoneno: document.getElementById("phoneno").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            summary: document.getElementById("summary").value,
            skills: Array.from(document.querySelectorAll(".skill")).map(skill => skill.value),
            achievements: Array.from(document.querySelectorAll(".achieve_title")).map((_, index) => {
                return {
                    title: document.querySelectorAll(".achieve_title")[index]?.value || "",
                    description: document.querySelectorAll(".achieve_description")[index]?.value || ""
                };
            }),
            experience: Array.from(document.querySelectorAll(".title")).map((_, index) => {
                return {
                    title: document.querySelectorAll(".title")[index]?.value || "",
                    organization: document.querySelectorAll(".organization")[index]?.value || "",
                    location: document.querySelectorAll(".location")[index]?.value || "",
                    startDate: document.querySelectorAll(".start-date")[index]?.value || "",
                    endDate: document.querySelectorAll(".end-date")[index]?.value || "",
                    description: document.querySelectorAll(".ex-description")[index]?.value || ""
                };
            }),
            education: Array.from(document.querySelectorAll(".edu-school")).map((_, index) => {
                return {
                    school: document.querySelectorAll(".edu-school")[index]?.value || "",
                    degree: document.querySelectorAll(".edu-degree")[index]?.value || "",
                    city: document.querySelectorAll(".edu-city")[index]?.value || "",
                    startDate: document.querySelectorAll(".edu-start-d")[index]?.value || "",
                    graduationDate: document.querySelectorAll(".edu-graduation-d")[index]?.value || "",
                    description: document.querySelectorAll(".edu-description")[index]?.value || ""
                };
            }),
            projects: Array.from(document.querySelectorAll(".proj-title")).map((_, index) => {
                return {
                    title: document.querySelectorAll(".proj-title")[index]?.value || "",
                    link: document.querySelectorAll(".proj-link")[index]?.value || "",
                    description: document.querySelectorAll(".proj-description")[index]?.value || ""
                };
            })
        };

        localStorage.setItem("cvData", JSON.stringify(cvData));
    }


    function loadFromLocalStorage() {
        const savedData = JSON.parse(localStorage.getItem("cvData"));
        if (savedData) {
            document.getElementById("firstname").value = savedData.firstname || "";
            document.getElementById("lastname").value = savedData.lastname || "";
            document.getElementById("designation").value = savedData.designation || "";
            document.getElementById("phoneno").value = savedData.phoneno || "";
            document.getElementById("email").value = savedData.email || "";
            document.getElementById("address").value = savedData.address || "";
            document.getElementById("summary").value = savedData.summary || "";

            savedData.skills.forEach((skill, index) => {
                if (index < document.querySelectorAll(".skill").length) {
                    document.querySelectorAll(".skill")[index].value = skill;
                }
            });

            
        }
    }

   
    document.getElementById("sbmit").addEventListener("click", updateCV);

    // function addFields(event) {
    //     const button = event.target;
    //     const repeaterContainer = button.previousElementSibling.querySelector("[data-repeater-list]");
    //     const newItem = repeaterContainer.firstElementChild.cloneNode(true);

        
    //     newItem.querySelectorAll("input, textarea").forEach(input => (input.value = ""));

  
    //     const deleteBtn = document.createElement("button");
    //     deleteBtn.textContent = "Delete";
    //     deleteBtn.className = "btn-delete";
    //     deleteBtn.addEventListener("click", (e) => {
    //         e.preventDefault();
    //         newItem.remove();
    //     });

    //     newItem.appendChild(deleteBtn);
    //     repeaterContainer.appendChild(newItem);
    // }

  
    document.querySelectorAll(".btn-add").forEach(button => {
        button.addEventListener("click", addFields);
    });


    document.querySelectorAll(".btn-delete").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const item = button.closest("[data-repeater-item]");
            item?.remove();
        });
    });

    
    loadFromLocalStorage();
});


document.querySelector('.dowlode').addEventListener('click', function () {
  
    const cvContent = document.querySelector('.prntCv').innerHTML;
    const blob = new Blob([cvContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cv.html';  

    link.click();
});


