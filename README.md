# Usability Testing - Browser Extension
A Browser Extension that enables creating and taking usability tests as well as visualizing the test results.


## Creating a Test
This Browser Extension allows you to conduct a remote usability test to improve any web application.
The user has the option to create a new test containing multiple task where either a certain URL needs to be reached or a element needs to be clicked to complete them. 
Additionally, if wanted, a time limit can be added to each task. When selecting the wanted target, the creator of a test has the option to click on the wanted target.

## Taking a Test
After creating a test, it can be downloaded and distributed to any number of testers. Every tester can now simply upload the test file to automatically start the usability test. No moderator is needed as the plugin will display an overlay that guides the tester thought the test. 
When all tasks have been completed (successfully or not), a result file is created. This file can be sent back via different methods. 

- If the test creator submitted an email address the result file can be sent back. 
- If the creator uploads [this](https://github.com/Leonhard-Leopold/usability-testing/blob/master/server/storeResults.php) PHP script and submits the correct URL to the script at the creation of the test, the test results can be stored on a server. 
- If neither of these options are wanted, the tester also has the option to download the result file to sent it via another way.
 
## Visualizing the results
When the creator of the test has gathered all results files, all of them can be visualized with this extension where the success rate, average time taken and all comments left by testers are calculated and shown.
This can be used to pinpoint where users struggled to find the target to improve the web application.

### Other Information
It is also possible to create a test and visualize the result [here](http://leoleo.at/usabilityTest/) in a bigger window than the browser extension.
This implementation is available in two languages - [German](https://github.com/Leonhard-Leopold/usability-testing-german/) and English.

This tool was made by Leonhard Leopold. If you want to contact me or have any enquires, please contact **leonhardleopold@gmail.com**.
More information about me on can be found on [my webpage (currently under construction)](http://leoleo.at/). 

## How to use
A quick way to install it is to go the [Chrome Web Store](https://chrome.google.com/webstore/detail/usability-testing/hknopnlikakmpdnnnolojjjmkeckhagn). If downloaded, the developer options need to be activated and the folder containing the implementation needs to be uploaded to the browser. 
The extension is generalized for every browser in terms of internal communications of the software. 
With the help of special browsers, extenstions also can be used on mobile devices.

## Possible Additions & Current Issues
- Some browsers like don't allow the selection of files. Therefore another method for importing the test files needs to be created.
- Further methods used for usability testing could be implemented like screen, video and voice recording or eye- and mouse tracking.  
- To select the target various different approaches can be taken. For instance, the DOM tree, or the numbered instance of the CSS-class name could be selected.
- URL with a session ID are currently not detected. 
Feel free to contact me when you want to implement some of these features. 

**If you want to expand on the software download [this](https://github.com/Leonhard-Leopold/usability-testing) folder. If you want to just use it, download the [compressed version](https://github.com/Leonhard-Leopold/usability-testing/tree/master/compressed).**




