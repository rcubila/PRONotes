DDT
  1 On the Slack channel "zrh-daily-device-test" paste the following
	Daily Device Test in ZRH60 Starting.
	Officers participating (Name/Alias@):  
	Name LastName (Alias),  
	Name lastName (Alias)

2. Navigate to Quip
3. Search for "ZRH Cluster - Ticket Tracker" file
4. Open the link titled "ZRH60 [Daily Device Test Master Ticket] [MM/DD/YYYY to MM/DD/YYYY]"
5. In the left sidebar under "Ticket Summary" section:
   - Change Status from "Pending" to "Work in Progress"
6. In the "Overview" tab:
   - Identify the Device(s) that need to be tested for the current date
7. Go to Optics new gengen:
   - Click the "Activities" tab
   - Select the checkbox(es) for the Device(s) listed for the current date in the ticket
8. Click the "Action" dropdown menu in the top right:
   - Select "Start test"
9. Count each test event (Example: 1x Invalid Pin, 2x Granted no entry, 3x DFO, 1x DHO)
10. Return to the Slack channel "zrh-daily-device-test":
   - Update the original Starting script to "finished"
11. Return to Quip:
    - Search for "Daily device test" file and open it
    - Click on your site tab (Example: ZRH60)
    - Locate the tested device in the "DEVICE" column
    - Find the current month column and update the matching row with the current date
12. Add a comment to the date cell:
    - Right-click on the cell
    - Select "Comment"
    - Add the following template information:
      ```
      Device: 
      ZRH60-2.2.00-YZN-MDF RM 3RD FLR IN-HD
      ZRH60-2.2.00-YZN-MDF RM 3RD FLR OUT-HD
      Starting Time: [Time] CET
      Ending Time: [Time] CET
      Officers participating (Name/Alias@): [Name] ([ID])
      Alarms generated: [List of alarms]
      ```
13. Update the ticket:
    - Add the same template information to the "Worklog" tab
    - Change the ticket status to "Pending/Pending Research"
    - Save the changes
