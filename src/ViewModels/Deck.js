 const deckViewModel = ({userId, title, details}) => ({
    userId,
    title,
    details,
    userId_set (newId) {
        this.userId = newId;
    },
    title_set (newTitle) {
        this.title = newTitle;
    },
    details_set (newDetail) {
        this.details = newDetail;
    }
 });

export default deckViewModel;