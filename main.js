document.getElementById("issueInputForm").addEventListener("submit", (e) => {

    var issueDesription = document.getElementById("issueDescInput").value;
    var issueSeverity = document.getElementById("issueSeverityInput").value;
    var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    var issueID = chance.guid();
    var status = "open";

    var issue = {
        id: issueID,
        description: issueDesription,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: status
    }


    if (localStorage.getItem("issues") == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    }

    e.preventDefault();

    fetchIssue();

})

const setStatusClosed = (id) => {
    var issues = JSON.parse(localStorage.getItem("issues"));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = "closed"
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssue();
}

const deleteIssue = (id) => {
    var issues = JSON.parse(localStorage.getItem("issues"));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1)
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    fetchIssue();
}

const fetchIssue = () => {
    var issues = JSON.parse(localStorage.getItem("issues"));
    var issuesList = document.getElementById("issuesList");

    issuesList.innerHTML = "";

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var description = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo
        var status = issues[i].status;

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