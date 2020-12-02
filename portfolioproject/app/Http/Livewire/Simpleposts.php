<?php

namespace App\Http\Livewire;

use Livewire\Component;
use App\Models\SimplePost;

class Simpleposts extends Component
{
    public $posts, $title, $body, $post_id;
    public $updateMode = false;
    public $isOpen = 0;

    public function render()
    {
        $this->posts = SimplePost::all();
        return view('livewire.simpleposts');
    }

    private function resetInputFields(){
        $this->title = '';
        $this->body = '';
        $this->post_id = '';
    }

    public function openModal()
    {
        $this->isOpen = true;
    }

    public function closeModal()
    {
        $this->isOpen = false;
    }

    public function create()
    {
        $this->resetInputFields();
        $this->openModal();
    }

    public function store()
    {
        $validatedDate = $this->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        SimplePost::create($validatedDate);

        session()->flash('message', 'Post Created Successfully.');

        $this->closeModal();
        $this->resetInputFields();
    }

    public function update()
    {
        $validatedDate = $this->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        if($this->post_id) {
            $post = SimplePost::find($this->post_id);
            $post->update([
                'title' => $this->title,
                'body' => $this->body
            ]);
            $this->updateMode = false;
            session()->flash('message', 'Post Updated Successfully.');
                $this->closeModal();
                $this->resetInputFields();
        }
    }

    public function edit($id)
    {
        $this->updateMode = true;
        $post = SimplePost::where('id',$id)->first();
        $this->post_id = $id;
        $this->title = $post->title;
        $this->body = $post->body;

        $this->openModal();
    }

    public function cancel()
    {
        $this->updateMode = false;
        $this->closeModal();
        $this->resetInputFields();
    }

    public function delete($id)
    {
        SimplePost::find($id)->delete();
        session()->flash('message', 'Post Deleted Successfully.');
    }


}
