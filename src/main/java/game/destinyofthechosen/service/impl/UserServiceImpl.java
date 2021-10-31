package game.destinyofthechosen.service.impl;

import game.destinyofthechosen.model.service.UserRegisterServiceModel;
import game.destinyofthechosen.repository.UserRepository;
import game.destinyofthechosen.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserServiceImpl(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void register(UserRegisterServiceModel userModel) {
        //TODO
    }
}
