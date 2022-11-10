/**
 * Only the Assigned To can Edit, Save ,Update, and  Delete a record.
 * State should be New or In Progress or Pending
 * Remove the Update button from the form if the user is not the Assigned To.   
 * Remove the Save option form Form Context Menu if the user is not the Assigned To.
 * Remove the Delete option form Form Context Menu if the user is not the Assigned To.
 * User unable to delete the record from the List View if the user is not the Assigned To.
 * @param {Object} current - GlideRecord object for the current record
 * 
 */

// Approaches to this Problem
// 1. UI Policy Action - Not Applicable
// 2. UI Action - In Question
// 3. Client Script
// 4. Script Include
// 5. Business Rule


// Condition
(current.state == 1 || current.state == 2 || current.state == 5) && (!(current.assigned_to.nil()))

//script