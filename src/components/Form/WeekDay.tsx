interface WeekDayProps {
    name: string;
    key: string;
}

export function WeekDay(props:WeekDayProps) {
    const name = props.name.toUpperCase()
    const initial = name.charAt(0)

    return (
        <button title={name} className='w-8 h-8 rounded bg-zinc-900 capitalize'>
            {initial}
        </button>
    )
}