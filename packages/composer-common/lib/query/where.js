/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const IllegalModelException = require('../introspect/illegalmodelexception');

/**
 * Where defines the WHERE portion of a SELECT statement
 *
 * @private
 * @class
 * @memberof module:composer-common
 */
class Where {

    /**
     * Create a Where from an Abstract Syntax Tree. The AST is the
     * result of parsing.
     *
     * @param {Select} select - the Select for this Where
     * @param {string} ast - the AST created by the parser
     * @throws {IllegalModelException}
     */
    constructor(select, ast) {
        if(!select || !ast) {
            throw new IllegalModelException('Invalid Select or AST');
        }

        this.ast = ast;
        this.select = select;
        this.process();
    }

    /**
     * Visitor design pattern
     * @param {Object} visitor - the visitor
     * @param {Object} parameters  - the parameter
     * @return {Object} the result of visiting or null
     * @private
     */
    accept(visitor,parameters) {
        return visitor.visit(this, parameters);
    }

    /**
     * Returns the Select that owns this Where.
     *
     * @return {Select} the owning Select
     */
    getSelect() {
        return this.select;
    }

    /**
     * Process the AST and build the model
     *
     * @throws {IllegalModelException}
     * @private
     */
    process() {
    }

    /**
     * Semantic validation of the structure of this where.
     *
     * @throws {IllegalModelException}
     * @private
     */
    validate() {
        // TODO (DCS) walk the AST and check that the properties exist in the model!
    }

    /**
     * Returns a new object representing this Where that is
     * suitable for serializing as JSON.
     * @return {Object} A new object suitable for serializing as JSON.
     */
    toJSON() {
        let result = {
            ast: this.ast
        };
        return result;
    }
}

module.exports = Where;
