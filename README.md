## Suspect Outage in another Service?
You can determine if there is an outage in another service [here](https://portal.microsofticm.com/imp/v3/outages/dashboard/azure/declaredoutages)
You can also visit the [Emerging Issues](https://teams.microsoft.com/l/channel/19%3a84eb30879ef349cfab9079077ebdb041%40thread.skype/Emerging%2520Issues%2520(Teams)?groupId=938f266e-bd12-4d27-84a6-e185614e69b2&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) channel.

## Prerequisites
If you don't have Kusto, install it from [here](https://aria.kusto.windows.net:443/bc3902d8132f43e3ae086a009979fa88)  
Refer to [Teams Regions](./How_Tos/teams_regions.md) for an example of filtering by region.

## Declaring Outage for Automated Alerts

The decision to declare outage may be subjective and dependent on the scenario. Whenever declaring outage, engage all dependent teams immediately.  
Declare outage if:
- Availability drop <98% for any Tier0 or Tier1 scenario more than 30mins and unique users > 50 (See Tier0 and Tier1 Scernario definition [here](https://microsoft.sharepoint.com/teams/skypespacesteamnew/Shared%20Documents/Livesite/Teams%20Livesite/Livesite%20Processes/TeamsCEN.pdf))
- Mutliple sev2 (3+) alerts fire within 15 mins across multiple regions for different scenarios. (This is a scenario where many alerts fired around the same time. When this happens, it's usually indicates that there's a large issues brewing. As such declare outage immediately and engage all dependent teams for analysis.)
- Availability drop < 90% for any scenario.
- Wide user-impact (>50 users) or S500 Single Tenant Outage for any Tier0 or Tier1 Scenario in ring3+ for public clouds or any ring for Govt. Clouds (Reported by Guardians - [Dashbaord here](https://jarvis-west.dc.ad.msft.net/dashboard/SkypeSpaces/SkypeSpacesWusProd/Guardians/Tier%25200%2520-%2520Tenant%2520Specific?overrides=[{%22query%22:%22//*[id=%27Tenant%27]%22,%22key%22:%22value%22,%22replacement%22:%22%22}]%20))
- Security + Privacy
- Suspect Data-Loss
- Suspect Personal data compromised
- Monitoring Failure
- e2e Performance metrics showing 10% regression
- Production Certificates due to expire within 1 week (Contact EM)
- Engineering Tools (Build/Deploy/ECS) unavailable
- At Teams Incident Manager discretion
  
Note: We have noticed some discrepancies between our reliability queries and the monitor data. When in doubt, the monitor data should be considered the source of truth, so
you should declare outage if the alert does not self-mitigate and the monitor continues to show < 99% reliability

Reference: [Declare Outage Guidelines Doc](https://microsoft.sharepoint.com/teams/skypespacesteamnew/Shared%20Documents/Livesite/Teams%20Livesite/Livesite%20Processes/TeamsCEN.pdf)

## Declaring Outage for CFL
- It's not required to declare outage for CFLs as they are by nature a SEV2 and specific to a single tenant. But, if during your investigation you determine that the issue affects multiple tenants 
then declare outage and follow the incident management process to drive and mitigate the issue.

Run the queries below replacing `scenario_name`, `region`, `ring` with your scenario to determine user impact numbers.

## User Impact Data
Most Sev2 incidents will require a post-mortem meeting where team members meet to discuss root cause, analyze what went well/wrong and come up with repair items to prevent the 
issue in the future. It is important to collect the required impact data quickly, given that Kusto retention is very low (~4-5 hours). You should collect initial impact data 
(right after the incident starts) and also when the incident is mitigated (this is what you will provide for the post-mortem). Note: If you need to get impact data after the data
is wiped out in Kusto you can try using Interana, refer to [this TSG](https://domoreexp.visualstudio.com/DefaultCollection/Teamspace/_git/SkypeTeams-SRE?path=%2Ftsg%2FMessaging%2FHow_Tos%2Fhow_to_get_impact_data_with_interana.md&version=GBlive&_a=preview) for instructions.

The following queries are sufficient for determining impact and should be included in the **Impact** section of the postmortem document:
- Distinct # of impacted tenants
- Distinct # of impacted users 
- \# of scenario attempts - Total number of users (as seen by telemetry) that were using the scenario during the impact timeframe. Use this value for the DAU field in the post-mortem template.
- % impacted scenario attempts - This tells us relative impact of the issue on the users that were attempting the scenario. You will use this to fill out the "% of DAU" field in the post-mortem template. 
- Distinct # of impacted users by tenant 

Additionally, you must provide the % of impacted active users per tenant as part of the post-mortem so we can determine potential payout amounts for impacted customers. It is required to provide 
a csv file with this information as this is the format that the post-mortem requires.

[Sample filled out post-mortem document](https://portal.microsofticm.com/imp/v3/incidents/postmortem/302532) (refer to Impact section).

# Common Kusto Functions
 - Kusto functions have been created to execute common Kusto queries.  To execute the function copy the function found in the query table below to the Kusto app replace the parameters with the values you need and execute the function. You can find the definition for all the Kusto functions [here](./../../queries/messaging/messaging-dri-functions.md)


### Kusto Function Parameter Definition      
    // Most parameters are optional, for startTime and endTime you can use '' to default to the last 2h
    // Run as single query and Kusto will provide the values in separate tabs

    **dbName:**        
    Public Kusto Database (includes GCC): "SkypeTeams Web FE Prod"
    DoD Kusto Database: "Teams Web FE DoD"
    GCCH Kusto Database: "Teams Web FE GCCH"

    **scenarioNames:** array of scenarios to query - (scenarioName="messaging_delete_message" | scenarioName='["messaging_delete_message", "chat_switch_v2"]'
    **startTime:** Query start time (ago(4h) |  datetime(09/27/2020 06:00:00) //UTC)
    **endTime:** Query end time. (i.e. now()) | datetime(09/27/2020 06:00:00) //UTC)   
    **rings:** array of 1 or many rings - '["ring0", "ring1", "ring2", "ring3", "general", "general_gcc", "gcchigh-general", "dod-general"]'
    **regions:** array of 1 or many regions '["amer", "emea", "uk", "gcc", "apac", "ca", "in", "fr", "au", "za", "jp", "kr", "ae", "de", "ch", "sg", "no"]'  
    **intervalTime:** timespan used to summarize interval (use 5m if you want to mimic geneva's internval).   
    **isedu:** true when you want to query edu specific data. Otherwise false (default)).      

### Note: For GCCH and DOD 'regions' and 'isedu' are not supported.  Be caustion as the ring  

## User Impact Kusto Functions

|  <b>Query Name</b>   | <b>Kusto Function</b> |
|---------------|-------------|------------------|
| Distinct # of impacted users | database("SkypeTeams Web FE Prod").DRI_ImpactedUsers(dbName="SkypeTeams Web FE Prod", scenarioName="chat_send_message", startTime=ago(1h), endTime=now(), rings='["ring3", "general"]', regions='["emea", "in"]');   |
| Distinct # of impacted users by tenant | database("SkypeTeams Web FE Prod").DRI_ImpactedUsersByTenant(dbName="SkypeTeams Web FE Prod", scenarioName="chat_send_message", startTime=ago(1h), endTime=now(), rings='["ring3", "general"]', regions='["emea", "in"]' |
| Distinct # of impacted tenants | database("SkypeTeams Web FE Prod").DRI_ImpactedTenants(dbName="SkypeTeams Web FE Prod", scenarioName="chat_send_message", startTime=ago(1h), endTime=now(), rings='["ring3", "general"]', regions='["emea", "in"]');  |
| List of Impacted Tenants | database("SkypeTeams Web FE Prod").DRI_ImpactedTenants(dbName = "SkypeTeams Web FE Prod", scenarioName = "chat_send_message", startTime = ago(3h), endTime = now(), rings = '["general"]', regions = '["amer"]', isedu = false)   |
| % impacted active users per tenant (use this query for service credit, i.e., customer payouts are based on this data, save query results to CSV file) | database("SkypeTeams Web FE Prod").DRI_ImpactedUsersByTenantPercent(dbName="SkypeTeams Web FE Prod", scenarioName="messaging_delete_message", startTime=ago(1h), endTime=now(), rings='["ring3", "general"]', regions='["emea", "in"]');  |
| Distinct # of Impacted Users Per Time Interval | database("SkypeTeams Web FE Prod").DRI_ImpactedUsersPerTimeInterval("SkypeTeams Web FE Prod", "chat_send_message", startTime=ago(3h), endTime=now(), rings='["general", "ring3"]', regions='["amer", "emea"]', intervalTime=5m, true) |
| |



## Scenario Reliability Kusto Functions

|  <b>Query Name</b>   | <b>Kusto Function</b> |
|---------------|-------------|
| Scenario Reliability Chart over the last 2h in 5 minute increments | database("SkypeTeams Web FE Prod").DRI_ScenarioReliabilityChart(dbName="SkypeTeams Web FE Prod", scenarioName="chat_send_message", startTime=ago(1h), endTime=now(), rings='["ring3", "general"]', regions='["emea", "in"]', intervalTime=5m); |
| Scenario Reliability Chartover the last 12 hours in 15 minute increments | database("SkypeTeams Web FE Prod").DRI_ScenarioReliabilityChart(dbName="SkypeTeams Web FE Prod", scenarioName="chat_send_message", startTime=ago(12h), endTime=now(), intervalTime=15m); |
| Scenario reliability across all rings in the last 8h | database("SkypeTeams Web FE Prod").DRI_OverallScenarioReliability(scenarioName="<scenario_name>",startTime=ago(8h), endTime='') |
| Scenario reliability by ring in the last 8h | database("SkypeTeams Web FE Prod").DRI_ScenarioReliabilityByRing(scenarioName="<scenario_name>", startTime=ago(8h), endTime='') |
| Scenario reliability by region in the last 8h | database("SkypeTeams Web FE Prod").DRI_ScenarioReliabilityByRegion(scenarioName="chat_switch_v2", startTime=ago(8h), endTime='') |
| % impacted scenario attempts (use this query for post-mortem % DAU value)  | database("SkypeTeams Web FE Prod").DRI_ScenarioAttemptImpactPercent(dbName=dbName, scenarioName=scenario, startTime=start, endTime=end, rings=rings, regions=regions); |
| Scenario Success/Failure Count (**use this query for post-mortem DAU value**)  | database("SkypeTeams Web FE Prod").DRI_ScenarioAttempts(dbName="SkypeTeams Web FE Prod", scenarioName="chat_send_message", startTime=ago(4h), endTime=now(), rings='["ring3", "general"]', regions='["emea", "in"]');  |
| | |


## Scenario/HTTP Kusto Functions
## Note: ScenarioName only takes a single scenario name and not an array of scenario names.

|  <b>Query Name</b>   | <b>Kusto Function</b> |
|---------------|-------------|
| Count of HTTP Errors (Status Code) |  database("SkypeTeams Web FE Prod").DRI_CountOfHttpErrors(dbName: string = "SkypeTeams Web FE Prod", scenarioName: string, startTime: datetime, endTime: datetime, rings: string = "", regions: string = "", isedu: bool = false) |
| Count of Final Scenario Step  |  database("SkypeTeams Web FE Prod").DRI_CountOfFinalScenarioStep(dbName: string = "SkypeTeams Web FE Prod", scenarioName: string, startTime: datetime, endTime: datetime, rings: string = "", regions: string = "", isedu: bool = false)  | 
| | |

## Other User Impact Queries

The additional user impact queries can be used to dig deeper into an incident's data

### Number of tenants impacted by timeout/failure per region in the last 2h
    let start = ago(2h); // <---- REPLACE WITH INCIDENT START TIME 
    let end = now();     // <---- REPLACE WITH RELEVANT END TIME
    let regions = dynamic(["amer", "emea", "uk", "gcc", "apac", "ca", "in", "fr", "au", "za", "jp", "kr", "ae", "de", "ch", "sg"]); // <---- EDIT HERE TO INCLUDE 
    let scenarioName = "<scenario_name>";
    
    database("SkypeTeams Web FE Prod").scenario
    | where EventInfo_BaseType == scenarioName
    | where ['step'] == "stop"
    | where status in ("timeout", "failure")
    | where userType in ('user', '')
    | where EventInfo_Time > start and EventInfo_Time <= end
    | extend Region = UserInfo_Region
    | where Region in (regions)
    | summarize numTenants = dcount(UserInfo_TenantId) by Region
    | order by numTenants

### Distinct users impacted by timeout/failure per ring in the last 2h
    let start = ago(8h); // <---- REPLACE WITH INCIDENT START TIME 
    let end = now();     // <---- REPLACE WITH RELEVANT END TIME
    let scenarioName = "<scenario_name>";
    database("SkypeTeams Web FE Prod").scenario
    | where EventInfo_BaseType == scenarioName
    | where ['step'] == "stop"
    | where status in ("timeout", "failure")
    | where userType in ('user', '')
    | where EventInfo_Time > start and EventInfo_Time <= end
    | summarize numUsers = dcount(UserInfo_Id) by UserInfo_Ring
    | order by numUsers

### Distinct users impacted by timeout/failure per region in the last 8h
    let start = ago(8h); // <---- REPLACE WITH INCIDENT START TIME 
    let end = now();     // <---- REPLACE WITH RELEVANT END TIME
    let regions = dynamic(["amer", "emea", "uk", "gcc", "apac", "ca", "in", "fr", "au", "za", "jp", "kr", "ae", "de", "ch", "sg"]); // <---- EDIT HERE TO INCLUDE 
    let scenarioName = "<scenario_name>";
    database("SkypeTeams Web FE Prod").scenario
    | where EventInfo_BaseType == scenarioName
    | where ['step'] == "stop"
    | where status in ("timeout", "failure")
    | where userType in ('user', '')
    | where EventInfo_Time > start and EventInfo_Time <= end
    | extend Region = UserInfo_Region
    | where Region in (regions)
    | summarize numUsers = dcount(UserInfo_Id) by Region
    | order by numUsers


## Failure count queries

### Count of failures by host (ChatService, CSA, Notifications)
    let start = ago(8h); // <---- REPLACE WITH INCIDENT START TIME 
    let end = now();     // <---- REPLACE WITH RELEVANT END TIME
    <---- EDIT HERE TO INCLUDE
    let httpEvent = "<event_name>"; // <---- e.g. "dm_conversationmessage_get" for chat_switch_v2
    let CSAAffix = "chatsvcagg";
    let ChatServiceAffix = "ng.msg";
    let NotificationsAffix = "notifications";
    let hostRegex = "(.+?ng\\.msg\\..+?\\.com)|(chatsvcagg\\..+?\\.com)|(.+?notifications\\..+?\\.com)";
    let failureRegex = "^([^23][0-9]{2})|-1$";
    let scenarioView = ( 
    database("SkypeTeams Web FE Prod").http  
    | where EventInfo_BaseType contains httpEvent 
    | where EventInfo_Time > ago(2h)
    | where hostName matches regex hostRegex
    | where EventInfo_Time > start and EventInfo_Time <= end
    | where userType == "user"
    | where Tenant_Model != 3 // <---- NOT TFL
    | project EventInfo_BaseType, EventInfo_Time, hostName, resultcode
    );
    scenarioView
    | extend isFailure = iff(tostring(resultcode) matches regex failureRegex, 1, 0)
    | summarize totalEvents=count(), totalFailures=todouble(sum(isFailure)) by hostName, EventInfo_BaseType
    | extend availability = (totalEvents - totalFailures) / totalEvents * 100
    | join kind=inner( 
        scenarioView
        | where tostring(resultcode) matches regex failureRegex
        | summarize c=count() by hostName, resultcode, EventInfo_BaseType
        | evaluate pivot(resultcode, sum(c))
    ) on hostName, EventInfo_BaseType
    | project-away hostName1, EventInfo_BaseType1
    | sort by totalFailures desc, availability asc
    | extend service = iff(hostName contains ChatServiceAffix, "ChatService", iff(hostName contains CSAAffix, "CSA", iff(hostName contains NotificationsAffix, "Notifications", "OTHER")))
    | project-reorder EventInfo_BaseType, hostName, service, totalEvents, totalFailures, availability
