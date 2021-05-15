package net.openobject.ekko.qna.controller;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import net.openobject.ekko.common.auth.dto.JwtUserResponse;
import net.openobject.ekko.common.response.ApiResponse;
import net.openobject.ekko.common.security.jwt.JwtUtils;
import net.openobject.ekko.qna.dto.QuestionDto;
import net.openobject.ekko.qna.dto.QuestionModificationReuqest;
import net.openobject.ekko.qna.dto.QuestionRegistrationReuqest;
import net.openobject.ekko.qna.service.QuestionService;

@Slf4j
@RestController
@RequestMapping("/api/question")
public class QuestionController {
	
	@Autowired
	private QuestionService questionService;
	@Autowired
	private JwtUtils jwtUtils;
	
	@GetMapping("/search")
	public ApiResponse<List<QuestionDto>> search(
			Pageable pageable,
			@RequestParam(defaultValue = StringUtils.EMPTY, required = false) String query) {
		log.info("pageable: {}", pageable.toString());
		log.info("query: {}", query);
		return ApiResponse.ok(questionService.searchQuestion(pageable, query));
	}
	
	@PostMapping
	public ApiResponse<QuestionDto> register(@RequestBody QuestionRegistrationReuqest questionRegistrationReuqest) {
		log.info("questionRegistrationReuqest: {}", questionRegistrationReuqest);
		JwtUserResponse user = jwtUtils.getLoginUserEntity();
		return ApiResponse.ok(questionService.registerQuestion(questionRegistrationReuqest, user));
	}
	
	@PutMapping("/{questionId}")
	public ApiResponse<QuestionDto> modify(
			@PathVariable(value = "questionId", required = true) String questionId,
			@RequestBody QuestionModificationReuqest questionModificationRequest) throws Exception {
		log.info("questionId: {}, questionModificationRequest: {}", questionModificationRequest);
		JwtUserResponse user = jwtUtils.getLoginUserEntity();
		return ApiResponse.ok(questionService.modifyQuestion(questionId, questionModificationRequest, user));
	}
	
	@DeleteMapping("/{questionId}")
	public ApiResponse<?> remove(@PathVariable(value = "questionId", required = true) String questionId) throws Exception {
		JwtUserResponse user = jwtUtils.getLoginUserEntity();
		questionService.removeQuestion(questionId, user);
		return ApiResponse.ok();
	}
	
}
