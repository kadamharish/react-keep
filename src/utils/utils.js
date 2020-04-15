

/**
 * Convert image to Base64 URI
 * @param  {File} file 
 * @param  {Function} cb
 */
export function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

/**
 * Update data in database
 * @param  {string} username 
 * @param  {List} taskList 
 */
export function updateToDB(username, taskList) {
    localStorage.setItem(username, JSON.stringify(taskList));
}
