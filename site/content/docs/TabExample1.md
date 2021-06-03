---
title: First Tab Example
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This page shows an example of how content can be selectively displayed to different groups, using **Tabs**.
**An interesting aspect of tabs** is that if you select a tab on one page and navigate to another page, that tab remains selected.

<Tabs
  groupId="people-groups"
  defaultValue="managers"
  values={[
    {label: 'Managers', value: 'managers'},
    {label: 'Employees', value: 'employees'},
    {label: 'HR', value: 'HR'},
  ]
}>
<TabItem value="managers"><i>Generally, managers should do this or that...* Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...Generally, managers should do this or that...</i></TabItem>
<TabItem value="employees"><i>Employees should typically do that or this...* Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this....Employees should typically do that or this.....</i></TabItem>
<TabItem value="HR"><i>HR resources are available here or there...HR resources are available here or there..HR resources are available here or there..HR resources are available here or there..HR resources are available here or there..</i></TabItem>
</Tabs>

## Omitting Content for a Group

The above Tabs have content for all three categories of people.

The next Tabs has content only for Managers and Employees.  This is done by having the label for the HR category blank, so HR will not appear:


<Tabs
  groupId="people-groups"
  defaultValue="managers"
  values={[
    {label: 'Managers', value: 'managers'},
    {label: 'Employees', value: 'employees'},
    {label: '', value: 'HR'},
  ]
}>
<TabItem value="employees"><i>Employees should talk to their managers.... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk...</i></TabItem>
<TabItem value="managers"><i>Managers should talk to HR. talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk... talk...</i></TabItem>
<TabItem value="HR">&nbsp;</TabItem>
</Tabs>

## Details for all three categories

<Tabs
  groupId="people-groups"
  defaultValue="managers"
  values={[
    {label: 'Managers', value: 'managers'},
    {label: 'Employees', value: 'employees'},
    {label: 'HR', value: 'HR'},
  ]
}>
<TabItem value="managers">Specific information for managers...Specific information for managers..Specific information for managers..Specific information for managers..Specific information for managers..Specific information for managers..</TabItem>
<TabItem value="employees">Specific information for employees...Specific information..Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...</TabItem>
<TabItem value="HR">Specific information for HR...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...Specific information...</TabItem>
</Tabs>

