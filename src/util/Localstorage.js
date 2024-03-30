export const saveListToLocalStorage = (tasks) => {
    localStorage.setItem('letsRock', JSON.stringify(tasks))
}
 