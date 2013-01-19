Mongoid.load!("mongoid.yml", :development)

class OCCApi
  
  get '/' do
    "Welcome to the API"
  end
  
  #get all tasks lists
  get '/lists' do
    content_type :json
    all_lists = Tasklist.all
    all_lists.to_json
  end

  # create a new task list
  post '/lists' do
    title = params
    puts params
    Tasklist.new(title: title).save
    # tasklist = Tasklist.new()
  end

end


class Tasklist
  include Mongoid::Document

  # field :id, type: Integer
  field :title, type: String

  embeds_many :tasks
end

class Task
  include Mongoid::Document

  # field :id, type: Integer
  field :title, type: String

  embedded_in :tasklist
end