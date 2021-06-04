---
id: ContentEditingTech
title: For "Technical" Users
---

Technical users can use a git client to clone the configuration+content repo, make changes locally, and push those changes. They can also render a complete version of the site locally.




import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';



## Instructions for Setup

<Tabs
  groupId="operating-systems"
  defaultValue="Windows"
  values={[
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]
}>
  <TabItem value="Windows">

<ol>
 <li>Install Windows Subsystem for Linux (WSL).</li>
 <li>Install NodeJS by going to <a href="https://nodejs.org/en/download/">https://nodejs.org/en/download/</a></li>
 <li>Make sure you have a plaintext editor (ideally one that supports Markdown syntax highlighting).<br/>Examples:</li>
  <ul>
    <li>A good choice is: Notepad++.exe</li>
    <li>Atom</li>
    <li>Visual Studio Code</li>
  </ul>
 <li>Install a git client (e.g., either command line git, or Github Desktop)</li>
 <li>Clone the repository using git.<BR/>For example:

```jsx
git clone https://github.com/DMGT-TECH/authenticated-cloud-docs
```

 </li>
 <li>Run the script

```jsx
cd ./authenticated-cloud-docs
./localhost.sh
```

 </li>
 <li>A browser window automatically will open up with a live preview of your changes; if not, point a browser at <a href="http://localhost:3000/">http://localhost:3000/</a></li>
 </ol>
  </TabItem>
  <TabItem value="macOS">
  macOS instructions go here.
  </TabItem>
</Tabs>



## Instructions for Edits

<Tabs
  groupId="operating-systems-all"
  defaultValue="All Operating Systems"
  values={[
    {label: 'All Operating Systems', value: 'All Operating Systems'},
  ]
}>
  <TabItem value="All Operating Systems">

<ul>
<li> Edit files under ./site/content/</li>
<li> Commit and push when you're done.</li>
</ul>
</TabItem>
</Tabs>





