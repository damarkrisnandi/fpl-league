export default function DivisionBound(props) {
    const { message, color } = props;
    return (
        <a className={`flex flex-col items-center justify-center ${color} border border-gray-200 rounded-lg shadow md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mb-2`}>
            { message }
        </a>
    )
}