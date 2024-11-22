var inc = g_form.getUniqueValue();
var user = g_user.userID;

var email = "";
var channelID = "";
var teamIDUsed = "";
var teamName = "";
var channelCreatedName = "";
//https://teams.microsoft.com/l/channel/19:6bf4bcfee39c45149f3c0c974aabce02@thread.tacv2/?groupId=<group_id>&tenantId=

// [code]<span style="font-size: 10pt;">A teams channel is created in the team: <strong>Team 1</strong></span></p><p><span style="font-size: 10pt;"><a href="https://teams.microsoft.com/l/channel/19:6bf4bcfee39c45149f3c0c974aabce02@thread.tacv2/?groupId=<group_id>&amp;tenantId=" target="_blank" rel="noopener">Click here to open the Channel:</a><strong>Channel Name</strong></span></p>[/code]

var gx = new GlideAjax("MajorIncClientUtils");
gx.addParam("sysparm_name", "getUserEmailByID");
gx.addParam("user_id_teams", user);
gx.getXMLAnswer(getUserEmailCallback);

document.getElementById("select-tag").addEventListener("change", function () {
  var channelInputs = document.getElementById("channelInputs"); //select teams
  if (this.value) {
    channelInputs.classList.remove("hidden");
  } else {
    channelInputs.classList.add("hidden");
  }
});

document
  .getElementById("createChannelBtn")
  .addEventListener("click", function () {
    var buttonContainer = this.parentElement;

    var chanTitle = document.getElementById("channelTitle").value;
    var chanDesc = document.getElementById("channelDescription").value;
    var teamid = document.getElementById("select-tag").value;
    teamName =
      document.getElementById("select-tag").selectedOptions[0].textContent;
    teamIDUsed = teamid;

    if (chanTitle == "" || chanDesc == "") {
      alert("Please enter channel title and description");
      return;
    } else {
      buttonContainer.innerHTML =
        '<span class="loading-text">Loading...</span>';

      createChannel(teamid, chanTitle, chanDesc, buttonContainer);
    }
  });

document.getElementById("cancelBtn").addEventListener("click", function () {
  document.getElementById("channelInputs").classList.add("hidden");
});

document
  .getElementById("postMessageCheckbox")
  .addEventListener("change", function () {
    var messageInputs = document.getElementById("messageInputs");
    if (this.checked) {
      messageInputs.classList.remove("hidden");
    } else {
      messageInputs.classList.add("hidden");
    }
  });

document
  .getElementById("postMessageBtn")
  .addEventListener("click", function () {
    var buttonContainer = this.parentElement;

    var msgTitle = document.getElementById("messageTitle").value;
    var msgDesc = document.getElementById("message").value;

    if (msgTitle == "" || msgDesc == "") {
      alert("Please enter Message Title and Message");
      return;
    } else {
      //buttonContainer.innerHTML = '<span class="loading-text">Loading...</span>';
      document.getElementById("postMessageBtn").classList.add("hidden");
      document.getElementById("cancelMessageBtn").classList.add("hidden");
      document.getElementById("loading-post-msg").classList.remove("hidden");

      postMsgtoChannel(teamIDUsed, channelID, msgTitle, msgDesc);
    }
  });

document
  .getElementById("cancelMessageBtn")
  .addEventListener("click", function () {
    document.getElementById("messageInputs").classList.add("hidden");
    document.getElementById("postMessageCheckbox").checked = false;
  });

function lookUpTeamByUser(userEmail) {
  var inputs = {};

  inputs["user_email"] = userEmail; // String

  GlideFlow.startSubflow("global.look_up_teams_by_user__ms_teams", inputs)
    .then(function (execution) {
      return execution.awaitCompletion();
    }, errorResolverLookUpTeam)
    .then(function (completion) {
      var status = completion.status;

      // Available Outputs:
      var outputs = completion.outputs;
      var action_status = outputs["action_status"]; // String
      var teams_details = outputs["teams_details"]; // object

      if (status == "ERROR") {
        alert("Please click on Refresh MS Teams button!");
        return;
      }

      var select = document.getElementsByName("select-tag")[0];
      for (var i = 0; i < teams_details.length; i++) {
        var opt = teams_details[i];
        var el = document.createElement("option");
        el.textContent = teams_details[i]["displayName"];
        el.value = teams_details[i]["id"];
        select.appendChild(el);
      }

      //alert(typeof teams_details + " " + JSON.stringify(teams_details));
    });

  function errorResolverLookUpTeam(error) {
    // Handle errors in error resolver
    g_form.addErrorMessage(error);
  }
}

function getUserEmailCallback(response) {
  email = response;
  lookUpTeamByUser(email);
}

function getIncNotesCallback(response) {
  g_form.addInfoMessage("Work notes " + response);
}

function createChannel(teamID, channelName, channelDesc, buttonContainerHTML) {
  var inputs = {};

  inputs["channel_name"] = channelName; // String
  inputs["team_id"] = teamID; // String
  inputs["channel_description"] = "" + channelDesc; // String

  channelCreatedName = channelName;

  GlideFlow.startSubflow("global.create_a_channel_in_teams__ms_teams", inputs)
    .then(function (execution) {
      return execution.awaitCompletion();
    }, errorResolverCreateChannel)
    .then(function (completion) {
      var status = completion.status;

      // Available Outputs:
      var outputs = completion.outputs;
      var action_status = outputs["action_status"]; // String
      var channel_details = outputs["channel_details"]; // String
      channelID = channel_details;

      buttonContainerHTML.innerHTML = status;

      if (status == "ERROR") {
        return;
      } else {
        setTimeout(() => {
          buttonContainerHTML.innerHTML = "";
          document
            .getElementById("postMessageSection")
            .classList.remove("hidden");
        }, 2500);
      }

      var notes =
        '[code]<span style="font-size: 10pt;">A teams channel is created in the team: <strong>' +
        teamName +
        '</strong></span></p><p><span style="font-size: 10pt;"><a href="https://teams.microsoft.com/l/channel/' +
        channelID +
        "/?groupId=" +
        teamIDUsed +
        '&amp;tenantId=" target="_blank" rel="noopener">Click here to open the Channel:</a><strong>' +
        channelCreatedName +
        "</strong></span></p>[/code]";

      var gx = new GlideAjax("MajorIncClientUtils");
      gx.addParam("sysparm_name", "updateWorkNotes");
      gx.addParam("sys_id_inc", inc);
      gx.addParam("inc_notes", notes);

      gx.getXMLAnswer(getIncNotesCallback);
    });

  function errorResolverCreateChannel(error) {
    // Handle errors in error resolver
    g_form.addErrorMessage(error);
  }
}

function postMsgtoChannel(teamID, channelID, channelMsgTitle, channelMsg) {
  var inputs = {};

  inputs["channel_id"] = channelID; // String
  inputs["team_id"] = teamID; // String
  inputs["message"] = channelMsg; // String
  inputs["message_title"] = channelMsgTitle; // String

  GlideFlow.startSubflow("global.post_a_message_to_a_channel__ms_teams", inputs)
    .then(function (execution) {
      return execution.awaitCompletion();
    }, errorResolverPostMsg)
    .then(function (completion) {
      var status = completion.status;

      // Available Outputs:
      var outputs = completion.outputs;
      var message_id = outputs["message_id"]; // String
      var action_status = outputs["action_status"]; // String

      setTimeout(() => {
        document.getElementById("loading-post-msg").innerHTML = status;
      }, 3000);

      if (status == "ERROR") {
        return;
      } else {
        setTimeout(() => {
          document.getElementById("loading-post-msg").innerHTML =
            "Message posted to the channel!";
        }, 6000);
        setTimeout(() => {
          document.getElementById("postMessageBtn").classList.remove("hidden");
          document
            .getElementById("cancelMessageBtn")
            .classList.remove("hidden");
          document.getElementById("loading-post-msg").classList.add("hidden");
          document.getElementById("loading-post-msg").innerHTML = "Loading...";
        }, 9900);
      }
    });

  function errorResolverPostMsg(error) {
    // Handle errors in error resolver
    g_form.addErrorMessage(error);
  }
}

function refreshMSTeams() {
  var oauthRequestorContext = "oauth_2_0_credentials";
  var oauthRequestorSysId = "b20436a41b1f31500b0c4199bd4bcb67"; // crdentials
  var oauthProfileId = "ae0436a41b1f31500b0c4199bd4bcb34"; // profile ID [sys_id of  'OAuth Entity Profiles'
  var oauth_initiator_url =
    "/oauth_initiator.do" +
    "?oauth_requestor_context=" +
    oauthRequestorContext +
    "&oauth_requestor=" +
    oauthRequestorSysId +
    "&oauth_provider_profile=" +
    oauthProfileId +
    "&response_type=code";
  window.open(oauth_initiator_url, "", "height=500,width=800"); // pops up window
}
