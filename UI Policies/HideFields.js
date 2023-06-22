// FieldLabel Value Lang Sequence
// General Inquiry	500	en	0
// Hardware	300	en	0
// Software	400	en	0
// Quotes	14	en	0
// Orders	15	en	1

// nquiries	16	en	2

// Sourcing	17	en	3

// PIP	18	en	4

// Reporting	19	en	5

// Solution 	20	en	6

// Supply Chain	21	en	7

// Finance	22	en	8

// Suppport	24	en	9

// Cloud E-Commerce	25	en	10

// Cloud Reporting	27	en	11

// Customer 	28	en	12

// Contracts 	30	en	13

// Microsoft 	31	en	14

// Order Support	32	en	15

// CSS Opportunities	29	en	16

// DD	33	en	17

// GCP	26	en	18

// Client 	23	en	19
// Client Cloud 	34	en	20

function onConditionTrue() {
  g_form.removeOption("category", "500"); // General Inquiry
  g_form.removeOption("category", "300"); // Hardware
  g_form.removeOption("category", "400"); // Software
  g_form.removeOption("category", "14"); // Quotes
  g_form.removeOption("category", "15"); // Orders
  g_form.removeOption("category", "16"); // nquiries
  g_form.removeOption("category", "17"); // Sourcing
  g_form.removeOption("category", "18"); // PIP
  g_form.removeOption("category", "19"); // Reporting
  g_form.removeOption("category", "20"); // Solution 
  g_form.removeOption("category", "21"); // Supply Chain
  g_form.removeOption("category", "22"); // Finance
  g_form.removeOption("category", "24"); // Suppport
  g_form.removeOption("category", "25"); // Cloud E-Commerce
  g_form.removeOption("category", "27"); // Cloud Reporting
  g_form.removeOption("category", "28"); // Customer 
  g_form.removeOption("category", "30"); // Contracts 
  g_form.removeOption("category", "31"); // Microsoft 
  g_form.removeOption("category", "32"); // Order Support
  g_form.removeOption("category", "29"); // CSS Opportunities
  g_form.removeOption("category", "33"); // DD
  g_form.removeOption("category", "26"); // GCP
  g_form.removeOption("category", "23"); // Client 
  g_form.removeOption("category", "34"); // Client Cloud 
}

function onConditionFalse() {
  g_form.addOption("category", "500", "General Inquiry", "1"); // General Inquiry
  g_form.addOption("category", "300", "Hardware", "2"); // Hardware
  g_form.addOption("category", "400", "Software", "3"); // Software
  g_form.addOption("category", "14", "Quotes", "4"); // Quotes
  g_form.addOption("category", "15", "Orders", "5"); // Orders
  g_form.addOption("category", "16", "nquiries", "6"); // nquiries
  g_form.addOption("category", "17", "Sourcing", "7"); // Sourcing
  g_form.addOption("category", "18", "PIP", "8"); // PIP
  g_form.addOption("category", "19", "Reporting", "9"); // Reporting
  g_form.addOption("category", "20", "Solution ", "10"); // Solution
  g_form.addOption("category", "21", "Supply Chain", "11"); // Supply Chain
  g_form.addOption("category", "22", "Finance", "12"); // Finance
  g_form.addOption("category", "24", "Suppport", "13"); // Suppport
  g_form.addOption("category", "25", "Cloud E-Commerce", "14"); // Cloud E-Commerce
  g_form.addOption("category", "27", "Cloud Reporting", "15"); // Cloud Reporting
  g_form.addOption("category", "28", "Customer ", "16"); // Customer
  g_form.addOption("category", "30", "Contracts ", "17"); // Contracts
  g_form.addOption("category", "31", "Microsoft ", "18"); // Microsoft
  g_form.addOption("category", "32", "Order Support", "19"); // Order Support
  g_form.addOption("category", "29", "CSS Opportunities", "20"); // CSS Opportunities
  g_form.addOption("category", "33", "DD", "21"); // DD
  g_form.addOption("category", "26", "GCP", "22"); // GCP
  g_form.addOption("category", "23", "Client ", "23"); // Client 
  g_form.addOption("category", "34", "Client Cloud ", "24"); // Client Cloud 
}
