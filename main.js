document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {

    const issueDesc = document.getElementById("issueDescInput").value;
    const issueSeverity = document.getElementById("issueSeverityInput").value;
    const issueAssignedTo = document.getElementById("issueAssignedToInput").value;
    const issueId = chance.guid();
    const issueStatus = "open";

    const issue = {
        id: issueId,
        status: issueStatus,
        desc: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo
    }

    if (localStorage.getItem("issues") == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues))
    } else {
        var issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues))
    }




    document.getElementById("issueInputForm").reset();

    fetchIssues();

    e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues))

    fetchIssues();
}


function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem("issues"));

    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues))

    fetchIssues();
}


function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].desc;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML +=
            '<div class="well">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteIssue(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}