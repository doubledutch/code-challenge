var submission = {
    name: "",
    email: "",
    time: 0,
    challenge1Sol: "",
    challenge2Sol: ""
};
var startTime = null;
var hasSubmitted = false;

/**
 * Warn users before leaving the site
 */
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "If you leave this page, your progress will be lost. Click 'DoubleDutch Code Challenge' to go back to the challenges.  Be sure to submit your result before leaving.";
    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});


$(function() {
	showPage("#page-main");
    $('#input-container').validator().on('submit', function (e) {
        if (e.isDefaultPrevented()) {
            // invalid form
        } else {
            showPage("#page-selection");
            submission.name = $("#input-name").val();
            submission.email = $("#input-email").val();
            startChallenge();
            return false;
        }
    })
    $("#card-challenge-1").click(function() {
    	showPage("#page-challenge-1");
    });
    $("#card-challenge-2").click(function() {
    	showPage("#page-challenge-2");
    });
    $("#title-container").click(function() {
        if (submission.name && submission.email) {
            showPage("#page-selection");
        }
    });
    $("#back-arrow").click(function() {
        showPage("#page-selection");
    });

    $('#preview-modal').on('shown.bs.modal', function () {
        updateSubmissionSolutions();
        updatePreviewText();
    })
    $("#submit-button").click(function() {
        finishChallenge();
    });
});

function startChallenge() {
    startTime = new Date().getTime();
}

function updateSubmissionSolutions() {
    submission.challenge1Sol = $("#challenge-1-sol-text").val();
    submission.challenge2Sol = $("#challenge-2-sol-text").val();
}

function updatePreviewText() {
    var noSubmissionText = "<i>Not submitting a solution</i>";
    $("#preview-name").html(submission.name);
    $("#preview-email").html(submission.email);
    var chal1Content = (submission.challenge1Sol) ? submission.challenge1Sol : noSubmissionText;
    $("#preview-challenge-1").html(chal1Content);
    var chal2Content = (submission.challenge2Sol) ? submission.challenge2Sol : noSubmissionText;
    $("#preview-challenge-2").html(chal2Content);
}

function finishChallenge() {
    var endTime = new Date().getTime();
    submission.time = (endTime - startTime) / (1000 * 60.0);
    submission.time = Math.round(submission.time * 100) / 100
    updateSubmissionSolutions();
    submitSolutions();
}

function showPage(page) {
	$(".page").hide();
	$(page).fadeIn();
    if (page === "#page-challenge-1" || page === "#page-challenge-2") {
        $("#back-arrow").fadeIn();
    } else {
        $("#back-arrow").hide();
    }
}

function submitSolutions() {
    if (hasSubmitted) {
        alert("We already got your solutions. Thanks!")
        return;
    }

    Parse.initialize("Y6JK2hsv4W5Vvhgy8buUwlxmBB0ITnyZslt2Tjls", "vudxasfdywLDbFve6urYKpVHLAptAcrx2wJBlBkt");
    var Submission = Parse.Object.extend("Submission");
    var parseSubmission = new Submission();
    parseSubmission.save(submission).then(function(object) {
        alert("Your submission has been successfully submitted. Thanks for playing! :)")
    });
}