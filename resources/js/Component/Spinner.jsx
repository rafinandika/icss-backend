const Spinner = ({size= 12, color= 'blue-500', className= ''}) => {
    return (
        <div className={`w-${size} h-${size} border-4 border-t-4 border-${color} border-t-transparent rounded-full animate-spin ${className}`}></div>
    );
};

export default Spinner