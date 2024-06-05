function HTMXForm() {
    return (
        <>
            <form hx-post="/hello.html" hx-trigger="submit" hx-target="#result" hx-swap="outerHTML">
                <input type="text" name="task" id="task-input" placeholder="Add a task" required/>
                    <button type="submit" class="p-4 bg-green-500">Add Task</button>
            </form>
            <div hx-on:click="alert('Clicked!')">Click</div>
            <div id="result"></div>
        </>
    )
}

export default HTMXForm;