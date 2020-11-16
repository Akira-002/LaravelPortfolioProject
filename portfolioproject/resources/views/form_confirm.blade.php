<h3>CONFIRM</h3>
<form method="post" action="{{ route('form.send') }}">
	@csrf
	<label>Name</label>
	<div>
		{{ $input["name"] }}
	</div>
	<label>Title</label>
	<div>
		{{ $input['title'] }}
	</div>
	<label>Body</label>
	<div>
		{{ $input['body'] }}
	</div>

	<input name="back" type="submit" value="戻る" />
	<input type="submit" value="送信" />

</form>
