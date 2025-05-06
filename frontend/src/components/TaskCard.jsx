import PropTypes from 'prop-types';

export default function TaskCard({ task, onCompleted, isUpdating }) {
    return (
        <div className="p-6 bg-[#D9D9D9] border rounded-2xl shadow-md w-full">
            <h3 className="font-semibold text-xl mb-2">{task.title}</h3>

            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-800">{task.content}</p>
                <button
                    onClick={() => onCompleted(task.id)}
                    disabled={isUpdating}
                    className={`ml-4 w-24 border-2 border-[#333333] py-1 rounded-lg text-sm font-medium transition ${
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
