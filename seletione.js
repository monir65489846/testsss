function copySeleniumOutput(outputId) {
        let outputField = document.getElementById(outputId);
        outputField.select();
        document.execCommand('copy');
    }

    function processSeleniumData() {
        let input = document.getElementById("seleniumDataInput").value.trim();
        let lines = input.split("\n");
        document.getElementById("totalSeleniumLines").innerText = lines.length;

        let loggedData = [];
        let otherData = [];

        lines.forEach(line => {
            let columns = line.split("\t");
            if (columns.length >= 13) {
                let column11 = columns[10].trim();
                let column13 = columns[12].trim();

                if (column13.includes("Logged")) {
                    loggedData.push({ column11, column13 });
                } else {
                    otherData.push({ column11, column13 });
                }
            }
        });

        loggedData.sort((a, b) => parseInt(a.column11) - parseInt(b.column11));
        otherData.sort((a, b) => a.column13.localeCompare(b.column13) || parseInt(a.column11) - parseInt(b.column11));

        document.getElementById("seleniumLoggedOutput").value = loggedData.map(item => item.column11 + "\tLogged").join("\n");
        document.getElementById("seleniumOtherOutput").value = otherData.map(item => item.column11 + "\t" + item.column13).join("\n");

        document.getElementById("seleniumLoggedCount").innerText = loggedData.length;
        document.getElementById("seleniumOtherCount").innerText = otherData.length;
        document.getElementById("seleniumLoggedLines").innerText = loggedData.length;
        document.getElementById("seleniumOtherLines").innerText = otherData.length;

        // Combine all results
        let allResults = [...loggedData.map(item => item.column11 + "\tLogged"), ...otherData.map(item => item.column11 + "\t" + item.column13)];
        document.getElementById("seleniumAllOutput").value = allResults.join("\n");
        document.getElementById("seleniumAllCount").innerText = allResults.length;
        document.getElementById("seleniumAllLines").innerText = allResults.length;
    }