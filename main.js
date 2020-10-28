document.getElementById("issueInputForm").addEventListener("submit", (e) => {

    const issueDesription = document.getElementById("issueDescInput").value;
    const issueSeverity = document.getElementById("issueSeverityInput").value;
    const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    const issueID = chance.guid();
    const status = "open";

    const issue = {
        id: issueID,
        description: issueDesription,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: status
    }


    if (localStorage.getItem("issues") == null) {
        const issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        const issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    }

    e.preventDefault();

    fetchIssue();

})

const setStatusClosed = (id) => {
    const issues = JSON.parse(localStorage.getItem("issues"));

    for (const i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "closed"
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssue();
}

const deleteIssue = (id) => {
    const issues = JSON.parse(localStorage.getItem("issues"));

    for (const i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1)
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssue();
}

const fetchIssue = () => {
    const issues = JSON.parse(localStorage.getItem("issues"));
    const issuesList = document.getElementById("issuesList");

    issuesList.innerHTML = "";

    for (const i = 0; i < issues.length; i++) {
        const id = issues[i].id;
        const description = issues[i].description;
        const severity = issues[i].severity;
        const assignedTo = issues[i].assignedTo
        const status = issues[i].status;

        issuesList.innerHTML +=
            '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + description + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }


}