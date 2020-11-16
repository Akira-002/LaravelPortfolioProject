<h3>FORM</h3>
@if ($errors->any())
    <div style="color:red;">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

<form method="post" action="{{ route('form.post') }}">
	@csrf

	<label>Name</label>
	<div>
		<input type="text" name="name" value="{{ old('name') }}" />
    </div>

	<label>Title</label>
	<div>
		<input type="text" name="title" value="{{ old('title') }}" />
    </div>

	<label>Body</label>
	<div>
		<textarea name="body">{{ old('body') }}</textarea>
	</div>

	<input class="btn btn-primary" type="submit" value="送信" />
</form>
