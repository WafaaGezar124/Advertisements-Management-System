document.addEventListener("DOMContentLoaded", function () {
    const calendarEl = document.getElementById("calendar");
    if (!calendarEl) return;


    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        height: "auto",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [],
        eventDidMount: function (info) {
            info.el.addEventListener("contextmenu", function (e) {
                e.preventDefault();
                const menu = document.getElementById("contextMenu");
                if (!menu) return;
                menu.style.top = `${e.pageY}px`;
                menu.style.left = `${e.pageX}px`;
                menu.style.display = "block";
                menu.setAttribute("data-event-id", info.event.id);
            });
        },
    });

    calendar.render();


    document.addEventListener("click", () => {
        const menu = document.getElementById("contextMenu");
        if (menu) menu.style.display = "none";
    });


    const addPostBtn = document.getElementById("btnAddPost");
    const savePostBtn = document.getElementById("savePostBtn");
    const addPostModalEl = document.getElementById("addPostModal");
    const addPostModal = new bootstrap.Modal(addPostModalEl);
    const campaignFilter = document.getElementById("campaignFilter");
    const campaignSelect = document.getElementById("campaignName");
    const influencerInput = document.getElementById("influencerName");
    const captionInput = document.getElementById("postCaption");
    const dateTimeInput = document.getElementById("postDateTime");
    const mediaUpload = document.getElementById("mediaUpload");
    const mediaPreview = document.getElementById("mediaPreview");

    let editingEvent = null;


    addPostBtn.addEventListener("click", () => {
        // تنظيف الحقول
        influencerInput.value = "";
        captionInput.value = "";
        dateTimeInput.value = "";
        mediaUpload.value = "";
        mediaPreview.innerHTML = "";
        editingEvent = null;


        const selectedCampaign = campaignFilter.value;
        if (selectedCampaign) {
            campaignSelect.value = selectedCampaign;
            campaignSelect.disabled = true;
        } else {
            campaignSelect.value = "";
            campaignSelect.disabled = false;
        }

        addPostModal.show();
    });

    mediaUpload.addEventListener("change", () => {
        mediaPreview.innerHTML = "";
        const files = Array.from(mediaUpload.files);
        let imageCount = 0, videoCount = 0;

        files.forEach(file => {
            const fileURL = URL.createObjectURL(file);
            if (file.type.startsWith("image/")) {
                imageCount++;
                const img = document.createElement("img");
                img.src = fileURL;
                img.className = "img-thumbnail";
                img.style.width = "100px";
                img.style.height = "100px";
                img.style.objectFit = "cover";
                mediaPreview.appendChild(img);
            } else if (file.type.startsWith("video/")) {
                videoCount++;
                const video = document.createElement("video");
                video.src = fileURL;
                video.controls = true;
                video.style.width = "150px";
                video.style.height = "100px";
                mediaPreview.appendChild(video);
            }
        });

        if (videoCount > 1) {
            alert("⚠️ Only one video is allowed!");
            mediaUpload.value = "";
            mediaPreview.innerHTML = "";
        } else if (videoCount >= 1 && imageCount >= 1) {
            alert("⚠️ You can't upload both images and videos together!");
            mediaUpload.value = "";
            mediaPreview.innerHTML = "";
        }
    });

    // save post
    savePostBtn.addEventListener("click", () => {
        const campaign = campaignFilter.value || campaignSelect.value;
        const influencer = influencerInput.value.trim();
        const caption = captionInput.value.trim();
        const dateTime = dateTimeInput.value;

        if (!campaign || !influencer || !caption || !dateTime) {
            alert("⚠️ Please fill all fields before saving.");
            return;
        }

        const parsedDate = new Date(dateTime);
        if (isNaN(parsedDate.getTime())) {
            alert("⚠️ Please select a valid date and time.");
            return;
        }

        const files = Array.from(mediaUpload.files);
        let imageCount = 0, videoCount = 0;
        files.forEach(file => {
            if (file.type.startsWith("image/")) imageCount++;
            else if (file.type.startsWith("video/")) videoCount++;
        });

        if (videoCount > 1 || (videoCount >= 1 && imageCount >= 1)) {
            alert("⚠️ Invalid media selection!");
            return;
        }

        const mediaText =
            videoCount === 1
                ? "🎥 1 video attached"
                : imageCount > 0
                    ? `🖼️ ${imageCount} image(s) attached`
                    : "";

        const title = `[${campaign}] (${influencer}) - ${caption} ${mediaText}`;

        if (editingEvent) {
            editingEvent.setProp("title", title);
            editingEvent.setStart(parsedDate);
        } else {
            calendar.addEvent({
                id: `event-${Date.now()}`,
                title,
                start: parsedDate,
                backgroundColor: "#256D6F",
                borderColor: "#256D6F",
                textColor: "#fff",
            });
        }

        addPostModal.hide();
    });

    // edit post
    document.getElementById("editPostBtn").addEventListener("click", () => {
        const id = document.getElementById("contextMenu").getAttribute("data-event-id");
        const event = calendar.getEventById(id);
        if (!event) return;

        const match = event.title.match(/\[(.*?)\]\s\((.*?)\)\s-\s(.*)/);
        if (match) {
            campaignSelect.value = match[1];
            influencerInput.value = match[2];
            captionInput.value = match[3].replace(/🎥.*|🖼️.*/, "").trim();
        }

        dateTimeInput.value = event.start.toISOString().slice(0, 16);
        editingEvent = event;
        addPostModal.show();
    });

    // delete post
    document.getElementById("deletePostBtn").addEventListener("click", () => {
        const id = document.getElementById("contextMenu").getAttribute("data-event-id");
        const event = calendar.getEventById(id);
        if (event && confirm("🗑️ Delete this post?")) event.remove();
    });
});

