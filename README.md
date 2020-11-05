# Determining chat service health

* Using the links below compare the Teams client messaging dashboard with that of Chat Service during the time range of the incident for the identified region.
    * [Messaging Dashboard](http://aka.ms/messagingdashboard)  - vs -   [Chat Service Dashboard](https://jarvis-west.dc.ad.msft.net/dashboard/SkypeChatSpaces/Livesite%2520Review/Global%2520QoS%2520and%2520RPS?overrides=[{"query":"//*[id='component']","key":"value","replacement":"NG"},{"query":"//*[id='dataCenter']","key":"value","replacement":""}]%20)                
        * On the chat service dashboard select the *<operation_name>*  for the scenario that needs investigation. It is provided in the TSG.               
        * See [Chat Service Data Center to Region Mapping](./How_Tos/how_to_map_chatservice_datacenters_to_regions.md)
    * If the QoS dips align with that of CHAT Service then follow the steps [here](./How_Tos/how_to_escalate_to_other_teams.md) to Escalate to Chat Service

# Determine Chat Service Aggregator Service health. 

* Using the links below compare the Teams client messaging dashboard with that of CSA during the time range of the incident for the identified region.
    * [Messaging Dashboard](http://aka.ms/messagingdashboard)  - vs -   [CSA Dashboard Service](https://jarvis-west.dc.ad.msft.net/dashboard/SkypeSpaces/teamschatsvcagg/Prod_APIs_Stats), [CSA Dashboard (Client View)](https://portal.aria.ms/dashboard/ZGFzaGJvYXJk7d994e327ffc42f09e910e8798ff7325/tab/dGFia5bf2980934e4466897f4caa3ce93bd6?timeRange=P2W&granularity=P1D&projectId=bc3902d8132f43e3ae086a009979fa88)                
        * On the CSA dashboard look for the *ReplycChain* dashboards.
    * Another useful dahboard [CSA ConversationMessage_Get API](https://portal.aria.ms/dashboard/ZGFzaGJvYXJk7d994e327ffc42f09e910e8798ff7325/tab/dGFi686f00713612487b851d8ec447473b3c?projectId=bc3902d8132f43e3ae086a009979fa88) can be used to analyze if queries need to include dm_conversation_get API http call for analyzing or if replyChainAPI is sufficient. (for example: in case of messaging_load_channel_data_GCC_general_gcc) 
            * See [CSA Data Center to Region Mapping](./How_Tos/how_to_map_csa_datacenters_to_regions.md)             
    * If the QoS dips align with that of CSA then follow the steps [here](./How_Tos/how_to_escalate_to_other_teams.md) to Escalate to Chat Service Aggregator 

# Determining infrastructure health

* If Chat Service isn't the problem then determine whether there is an ongoing insfrastructure issue but quering [Suspect Azure Outage here](./messaging_user_impact_declare_outage.md).    
    * If there is, then esclate the incident to that team. [How to Escalate](./How_Tos/how_to_escalate_to_other_teams.md)
