import PropTypes from 'prop-types';

export default function TaskCard({ task, onCompleted, isUpdating }) {
    return (
        <div className="bg-[#D9D9D9] shadow-md rounded-xl p-4 flex flex-col md:flex-row justify-between w-full md:max-w-xl mb-4">
            <div className="flex-1 pr-4">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-base mt-2 font-normal">{task.content}</p>
            </div>

            <div className="mt-4 md:mt-0 md:flex md:items-end">
                <button
                    onClick={() => onCompleted(task.id)}
                    disabled={isUpdating}
                    className={`w-24 border-2 border-[#333333] py-1 rounded-lg text-sm font-medium transition ${
                        isUpdating
                            ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
                            : 'text-gray-800 hover:bg-gray-300'
                    }`}
                >
                    {isUpdating ? 'Updating...' : 'Done'}
                </button>
            </div>
        </div>
    );
}

TaskCard.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string,
    }).isRequired,
    onCompleted: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool,
};
