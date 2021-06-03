---
title: Second Tab Example
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This is a **second example page** with tabs.  Notice that the tab selection is preserved when you navigate among pages with tabs.

<Tabs
  groupId="people-groups"
  defaultValue="managers"
  values={[
    {label: 'Managers', value: 'managers'},
    {label: 'Employees', value: 'employees'},
    {label: 'HR', value: 'HR'},
  ]
}>
<TabItem value="managers">A managers note.</TabItem>
<TabItem value="employees">An employees note.</TabItem>
<TabItem value="HR">An HR note</TabItem>
</Tabs>


And some more notes:

<Tabs
  groupId="people-groups"
  defaultValue="managers"
  values={[
    {label: 'Managers', value: 'managers'},
    {label: 'Employees', value: 'employees'},
    {label: 'HR', value: 'HR'},
  ]
}>
<TabItem value="managers">Another managers note.</TabItem>
<TabItem value="employees">Another employees note.</TabItem>
<TabItem value="HR">Another HR note</TabItem>
</Tabs>

