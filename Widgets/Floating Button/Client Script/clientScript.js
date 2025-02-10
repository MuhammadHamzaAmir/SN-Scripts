api.controller = function ($scope, $timeout, spModal, spUtil) {
    $scope.showFeedbackForm = false;
    $scope.isSelecting = false; // Track selection process
    $scope.snapshotCanvas = null;

    // Initialize feedback data
    $scope.feedbackData = {
        type: '',
        description: '',
        includeAttachment: false,
        includeSnapshot: false,
        attachment: null,
        snapshot: '' // Holds base64 snapshot data
    };

    // Show/hide additional fields
    $scope.showAttachmentField = false;
    $scope.showSnapshotField = false;
    $scope.attachments = [];

    // Open feedback form
    $scope.openFeedbackForm = function () {
        $scope.showFeedbackForm = true;
    };

    // Close feedback form and reset fields
    $scope.closeFeedbackForm = function () {
        $scope.showFeedbackForm = false;
        $scope.feedbackData = {
            type: '',
            description: '',
            includeAttachment: false,
            includeSnapshot: false,
            attachment: null,
            snapshot: ''
        };
        $scope.showAttachmentField = false;
        $scope.showSnapshotField = false;
        $scope.attachments = [];
        $scope.isSelecting = false;
        $scope.removeSelectionArea();
    };

    // Watch for checkbox changes
    $scope.$watch('feedbackData.includeAttachment', function (newVal) {
        $scope.showAttachmentField = newVal;
    });

    $scope.$watch('feedbackData.includeSnapshot', function (newVal) {
        $scope.showSnapshotField = newVal;
    });

    // Handle File Selection & Convert to Base64
    $scope.uploadAttachment = function (files) {
        if (files && files.length > 0) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function (event) {
                $timeout(function () {
                    $scope.feedbackData.attachment = {
                        name: file.name,
                        data: event.target.result.split(',')[1] // Extract base64 content
                    };
                });
            };
            reader.readAsDataURL(file);
        }
    };

    // **New: Select Area for Snapshot**
    $scope.startSnapshotSelection = function () {
        $scope.isSelecting = true;

        var selectionDiv = document.createElement('div');
        selectionDiv.id = 'selectionBox';
        selectionDiv.style.position = 'absolute';
        selectionDiv.style.border = '2px dashed red';
        selectionDiv.style.zIndex = '9999';
        selectionDiv.style.pointerEvents = 'none';

        document.body.appendChild(selectionDiv);

        var startX, startY, endX, endY;
        var isSelecting = false;

        function onMouseDown(event) {
            isSelecting = true;
            startX = event.clientX;
            startY = event.clientY;

            selectionDiv.style.left = startX + 'px';
            selectionDiv.style.top = startY + 'px';
            selectionDiv.style.width = '0px';
            selectionDiv.style.height = '0px';
        }

        function onMouseMove(event) {
            if (!isSelecting) return;

            endX = event.clientX;
            endY = event.clientY;

            selectionDiv.style.width = Math.abs(endX - startX) + 'px';
            selectionDiv.style.height = Math.abs(endY - startY) + 'px';

            selectionDiv.style.left = Math.min(startX, endX) + 'px';
            selectionDiv.style.top = Math.min(startY, endY) + 'px';
        }

        function onMouseUp() {
            isSelecting = false;
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Capture Screenshot
            $scope.captureScreenshot(selectionDiv, startX, startY, endX, endY);
        }

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    // **Capture Screenshot of Selected Area**
    $scope.captureScreenshot = function (selectionDiv, startX, startY, endX, endY) {
        html2canvas(document.body, { useCORS: true }).then(function (canvas) {
            var croppedCanvas = document.createElement('canvas');
            var context = croppedCanvas.getContext('2d');

            var rect = {
                left: Math.min(startX, endX),
                top: Math.min(startY, endY),
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY)
            };

            croppedCanvas.width = rect.width;
            croppedCanvas.height = rect.height;

            context.drawImage(
                canvas,
                rect.left,
                rect.top,
                rect.width,
                rect.height,
                0,
                0,
                rect.width,
                rect.height
            );

            $timeout(function () {
                var snapshotBase64 = croppedCanvas.toDataURL('image/png').split(',')[1]; // Convert to Base64
                $scope.feedbackData.snapshot = snapshotBase64;

                // Display snapshot preview in the form
                var snapshotCanvas = document.getElementById('snapshotCanvas');
                snapshotCanvas.width = rect.width;
                snapshotCanvas.height = rect.height;
                var ctx = snapshotCanvas.getContext('2d');
                ctx.drawImage(croppedCanvas, 0, 0);
                snapshotCanvas.style.display = 'block';

                document.body.removeChild(selectionDiv);
                $scope.isSelecting = false;
            });
        });
    };

    // **Remove Selection Box if Feedback is Closed**
    $scope.removeSelectionArea = function () {
        var selectionBox = document.getElementById('selectionBox');
        if (selectionBox) {
            document.body.removeChild(selectionBox);
        }
    };

    // **Submit feedback**
    $scope.submitFeedback = function () {
        if (!$scope.feedbackData.type || !$scope.feedbackData.description) {
            spModal.alert('Please select a feedback type and provide a description.');
            return;
        }

        // Send feedback data to the server
        $scope.data.action = 'submitFeedback';
        $scope.data.feedbackData = angular.copy($scope.feedbackData);

        spUtil.update($scope).then(function (response) {
            if (response.success) {
                spModal.alert('Feedback submitted successfully!');

                // Retrieve & Display Uploaded Attachments
                if (response.attachments && response.attachments.length > 0) {
                    $scope.attachments = response.attachments;
                }

                $scope.closeFeedbackForm();
            } else {
                spModal.alert('Failed to submit feedback. Please try again.');
            }
        });
    };
};
